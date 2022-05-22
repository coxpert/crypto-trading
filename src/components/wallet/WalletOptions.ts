import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { getNetworkConfig, getSupportedChainIds } from '@/utils/networksConfig'
import { ChainId } from '@/config'

export enum WalletType {
  INJECTED = 'injected',
  WALLET_CONNECT = 'wallet_connect',
  WALLET_LINK = 'wallet_link'
}

const APP_NAME = 'Aave'
const APP_LOGO_URL = 'https://aave.com/favicon.ico'

export const getWallet = (
  wallet: WalletType = WalletType.WALLET_CONNECT,
  chainId: ChainId = ChainId.mainnet
): AbstractConnector => {
  const supportedChainIds = getSupportedChainIds()

  switch (wallet) {
    case WalletType.INJECTED:
      return new InjectedConnector({})
    case WalletType.WALLET_LINK:
      const networkConfig = getNetworkConfig(chainId)
      return new WalletLinkConnector({
        appName: APP_NAME,
        appLogoUrl: APP_LOGO_URL,
        url:
          networkConfig.privateJsonRPCUrl || networkConfig.publicJsonRPCUrl[0]
      })
    case WalletType.WALLET_CONNECT:
      return new WalletConnectConnector({
        rpc: supportedChainIds.reduce((acc, network) => {
          const config = getNetworkConfig(network)
          acc[network] = config.privateJsonRPCUrl || config.publicJsonRPCUrl[0]
          return acc
        }, {} as { [networkId: number]: string }),
        bridge: 'https://aave.bridge.walletconnect.org',
        qrcode: true
      })
    default: {
      throw new Error(`unsupported wallet`)
    }
  }
}
