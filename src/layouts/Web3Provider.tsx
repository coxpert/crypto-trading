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
import { WalletLinkConnector } from '@web3-react/walletlink-connector'


export type Web3Data = {
  connectWallet: (wallet: WalletType) => Promise<void>
  disconnectWallet: () => void
  currentAccount: string
  connected: boolean
  loading: boolean
  provider: JsonRpcProvider | undefined
  chainId: number
  switchNetwork: (chainId: number) => Promise<void>
  getTxError: (txHash: string) => Promise<string>
  error: Error | undefined
  switchNetworkError: Error | undefined
  setSwitchNetworkError: (err: Error | undefined) => void
  setAccount: React.Dispatch<React.SetStateAction<string>>
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

  // const [provider, setProvider] = useState<JsonRpcProvider>();
  const [mockAddress, setMockAddress] = useState<string>()
  const [connector, setConnector] = useState<AbstractConnector>()
  const [loading, setLoading] = useState(false)
  const [tried, setTried] = useState(false)
  const [deactivated, setDeactivated] = useState(false)
  const [switchNetworkError, setSwitchNetworkError] = useState<Error>()
  const [currentAccount, setAccount] = useState<string>('')

  const cleanConnectorStorage = useCallback((): void => {
    if (connector instanceof WalletConnectConnector) {
      localStorage.removeItem('walletconnect')
    } else if (connector instanceof WalletLinkConnector) {
      localStorage.removeItem('-walletlink:https://www.walletlink.org:version')
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:session:id'
      )
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:session:secret'
      )
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:session:linked'
      )
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:AppVersion'
      )
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:Addresses'
      )
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:walletUsername'
      )
    }
  }, [connector])

  const disconnectWallet = useCallback(async () => {
    cleanConnectorStorage()
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
                  rpcUrls: [
                    ...networkInfo.publicJsonRPCUrl
                  ],
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

  useEffect(() => {
    setMockAddress(localStorage.getItem('mockWalletAddress')?.toLowerCase())
    setAccount(localStorage.getItem('-wallet-account:address') || '')
  }, [])

  return (
    <Web3Context.Provider
      value={{
        web3ProviderData: {
          connectWallet,
          disconnectWallet,
          provider,
          connected: active || !!currentAccount,
          loading,
          chainId: chainId || 1,
          switchNetwork,
          getTxError,
          currentAccount: (currentAccount || account)?.toString() || '',
          setAccount: setAccount,
          error,
          switchNetworkError,
          setSwitchNetworkError
        }
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
