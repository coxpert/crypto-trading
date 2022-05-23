import React, { ReactElement, useCallback, useEffect, useState } from 'react'

import { hexToAscii } from 'src/utils/utils'
import { getNetworkConfig } from '../utils/networksConfig'

import { Web3Context } from '../hooks/useWeb3Context'
import { getWallet, WalletType } from '../components/wallet/WalletOptions'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { providers } from 'ethers'
import { SignatureLike } from '@ethersproject/bytes'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BaseNetworkConfig, networkConfigs } from '@/config'
import { ChainId, stringToBytes } from 'dexpools-sdk'
import { getPairs } from '@/utils/getPairs'
import { getTokenData } from '@/utils//getTokenData'
import { getOrderBooks } from '@/utils/getOrderbooks'
import { getChange } from '@/utils/getChange'

export interface TokenPairList {
  tokenA: string
  tokenB: string
  change: string
  pair: string
  symbol: string
  logoA: string
  logoB: string
}

export type Web3Data = {
  connectWallet: (wallet: WalletType) => Promise<void>
  disconnectWallet: () => void
  connected: boolean
  loading: boolean
  provider: JsonRpcProvider | undefined
  chainId: number | ChainId
  switchNetwork: (chainId: number) => Promise<void>
  getTxError: (txHash: string) => Promise<string>
  error: Error | undefined
  switchNetworkError: Error | undefined
  setSwitchNetworkError: (err: Error | undefined) => void

  // Private Connect
  currentAccount: string
  setAccount: React.Dispatch<React.SetStateAction<string>>
  network: BaseNetworkConfig
  setNetwork: React.Dispatch<React.SetStateAction<BaseNetworkConfig>>
  setChainId: React.Dispatch<React.SetStateAction<ChainId>>

  // Trades Data
  tokenPairList: TokenPairList[]
}

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({
  children
}) => {
  const {
    account,
    chainId,
    library: provider,
    activate,
    active,
    error,
    deactivate,
    setError
  } = useWeb3React<providers.Web3Provider>()

  const [mockAddress, setMockAddress] = useState<string>()
  const [connector, setConnector] = useState<AbstractConnector>()
  const [loading, setLoading] = useState(false)
  const [tried, setTried] = useState(false)
  const [deactivated, setDeactivated] = useState(false)
  const [switchNetworkError, setSwitchNetworkError] = useState<Error>()

  // Private Connect
  const [currentChainId, setChainId] = useState<ChainId>(ChainId.ARBITRUM_TEST)
  const [currentAccount, setAccount] = useState<string>('')
  const [network, setNetwork] = useState<BaseNetworkConfig>(
    networkConfigs[currentChainId]
  )

  // Trade Data
  const [tokenPairList, setTokenPairList] = useState<TokenPairList[]>([])

  useEffect(() => {
    setAccount(localStorage.getItem('-wallet-account:address') || '')
  }, [])

  useEffect(() => {
    handleSwitchChain()
  }, [chainId, currentChainId])

  const handleSwitchChain = async () => {
    const _chainId = (chainId || currentChainId).toString()
    if (_chainId) {
      const [tokenPairs, tokenData, orderBooks] = await Promise.all([
        getPairs(_chainId),
        getTokenData(_chainId),
        getOrderBooks(_chainId)
      ])
      console.log(tokenPairs, tokenData, orderBooks)
      if (tokenPairs && tokenData && orderBooks) {
        const _pairList: TokenPairList[] = tokenPairs.map((item) => {
          const tokenA = item.symbol.split('/')[0]
          const tokenB = item.symbol.split('/')[1]
          const id = stringToBytes(item.symbol)
          const logoA =
            tokenData.find((data) => data.symbol === tokenA)?.image || ''
          const logoB =
            tokenData.find((data) => data.symbol === tokenB)?.image || ''

          return {
            tokenA,
            tokenB,
            change: getChange(orderBooks[id]?.trades),
            pair: item.pair,
            symbol: item.symbol,
            logoA,
            logoB
          }
        })
        setTokenPairList(_pairList)
        console.log(_pairList)
      }
    }
  }

  const disconnectWallet = useCallback(async () => {
    localStorage.removeItem('walletProvider')
    deactivate()
    // @ts-expect-error close can be returned by wallet
    if (connector && connector.close) {
      // @ts-expect-error close can be returned by wallet
      // close will remove wallet from DOM if provided by wallet
      await connector.close()
    }

    setLoading(false)
    setDeactivated(true)
    setSwitchNetworkError(undefined)
    if (mockAddress) {
      setMockAddress(undefined)
      localStorage.removeItem('mockWalletAddress')
    }

    if (currentAccount) {
      setAccount('')
      localStorage.removeItem('-wallet-account:address')
      localStorage.removeItem('-wallet-account:private-key')
    }
  }, [provider, connector])

  // connect to the wallet specified by wallet type
  const connectWallet = useCallback(
    async (wallet: WalletType) => {
      setLoading(true)
      try {
        const connector: AbstractConnector = getWallet(wallet, chainId)

        if (connector instanceof WalletConnectConnector) {
          connector.walletConnectProvider = undefined
        }

        await activate(connector, undefined, true)
        setConnector(connector)
        setSwitchNetworkError(undefined)
        localStorage.setItem('walletProvider', wallet.toString())
        setDeactivated(false)
        setLoading(false)
      } catch (e: any) {
        console.log('error on activation', e)
        setError(e)
        // disconnectWallet();
        setLoading(false)
      }
    },
    [disconnectWallet]
  )

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  // TODO: recheck that it works on all wallets
  const signTxData = async (unsignedData: string): Promise<SignatureLike> => {
    if (provider && account) {
      const signature: SignatureLike = await provider.send(
        'eth_signTypedData_v4',
        [account, unsignedData]
      )

      return signature
    }
    throw new Error('Error initializing permit signature')
  }

  const switchNetwork = async (newChainId: number) => {
    if (provider) {
      try {
        await provider.send('wallet_switchEthereumChain', [
          { chainId: `0x${newChainId.toString(16)}` }
        ])
        setSwitchNetworkError(undefined)
      } catch (switchError: any) {
        const networkInfo = getNetworkConfig(newChainId)
        if (switchError.code === 4902) {
          try {
            try {
              await provider.send('wallet_addEthereumChain', [
                {
                  chainId: `0x${newChainId.toString(16)}`,
                  chainName: networkInfo.name,
                  nativeCurrency: {
                    symbol: networkInfo.baseAssetSymbol,
                    decimals: networkInfo.baseAssetDecimals
                  },
                  rpcUrls: [...networkInfo.publicJsonRPCUrl],
                  blockExplorerUrls: [networkInfo.explorerLink]
                }
              ])
            } catch (error: any) {
              if (error.code !== 4001) {
                throw error
              }
            }
            setSwitchNetworkError(undefined)
          } catch (addError: any) {
            setSwitchNetworkError(addError)
          }
        } else if (switchError.code === 4001) {
          setSwitchNetworkError(undefined)
        } else {
          setSwitchNetworkError(switchError)
        }
      }
    }
  }

  const getTxError = async (txHash: string): Promise<string> => {
    if (provider) {
      const tx = await provider.getTransaction(txHash)
      // @ts-expect-error TODO: need think about "tx" type
      const code = await provider.call(tx, tx.blockNumber)
      const error = hexToAscii(code.substr(138))
      return error
    }
    throw new Error('Error getting transaction. Provider not found')
  }

  return (
    <Web3Context.Provider
      value={{
        web3ProviderData: {
          connectWallet,
          disconnectWallet,
          provider,
          connected: active || !!currentAccount,
          loading,
          chainId: chainId || currentChainId,
          switchNetwork,
          getTxError,
          currentAccount: (currentAccount || account)?.toString() || '',
          error,
          switchNetworkError,
          setSwitchNetworkError,

          // Private Connect
          setAccount: setAccount,
          network,
          setNetwork,
          setChainId,

          // Trade Data
          tokenPairList
        }
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
