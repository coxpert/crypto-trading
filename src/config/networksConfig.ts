import { ChainId } from 'dexpools-sdk'

export const ChainIdToNetwork: Record<number, string> = {
  137: 'Metis',
  1088: 'Stardust Metis',
  42161: 'Arbitrum',
  421611: 'Arbitrum test'
}

export type ExplorerLinkBuilderProps = {
  tx?: string
  address?: string
}

export type ExplorerLinkBuilderConfig = {
  baseUrl: string
  addressPrefix?: string
  txPrefix?: string
}

export type NetworkConfig = {
  id: number
  name: string
  privateJsonRPCUrl?: string
  privateJsonRPCWSUrl?: string
  publicJsonRPCUrl: readonly string[]
  baseUniswapAdapter?: string
  wrappedBaseAssetSymbol?: string
  baseAssetSymbol: string
  baseAssetDecimals: number
  explorerLink: string
  isTestnet?: boolean
  networkLogoPath: string
  underlyingChainId?: number
}

export type BaseNetworkConfig = Omit<NetworkConfig, 'explorerLinkBuilder'>

export const networkConfigs: Record<string, BaseNetworkConfig> = {
  [ChainId.METIS_NETWORK]: {
    id: ChainId.METIS_NETWORK,
    name: 'Metis',
    publicJsonRPCUrl: ['https://andromeda.metis.io/?owner=1088'],
    baseAssetSymbol: 'METIS',
    wrappedBaseAssetSymbol: 'METIS',
    baseAssetDecimals: 18,
    explorerLink: 'https://andromeda-explorer.metis.io',
    networkLogoPath: '/icons/networks/metis.png'
  },
  [ChainId.METIS_STARDUST]: {
    id: ChainId.METIS_STARDUST,
    name: 'Metis Standard',
    publicJsonRPCUrl: ['https://stardust.metis.io/?owner=588'],
    baseAssetSymbol: 'METIS',
    wrappedBaseAssetSymbol: 'METIS',
    baseAssetDecimals: 18,
    explorerLink: 'https://stardust-explorer.metis.io/',
    networkLogoPath: '/icons/networks/metis.png'
  },
  [ChainId.ARBITRUM]: {
    id: ChainId.ARBITRUM,
    name: 'Arbitrum Rinkeby',
    publicJsonRPCUrl: ['https://rinkeby.arbitrum.io/rpc'],
    baseUniswapAdapter: '0x0',
    baseAssetSymbol: 'ETH',
    wrappedBaseAssetSymbol: 'WETH',
    baseAssetDecimals: 18,
    explorerLink: 'https://testnet.arbiscan.io',
    networkLogoPath: '/icons/networks/arbitrum.png'
  },
  [ChainId.ARBITRUM_TEST]: {
    id: ChainId.ARBITRUM_TEST,
    name: 'Arbitrum',
    publicJsonRPCUrl: ['https://arb1.arbitrum.io/rpc'],
    baseUniswapAdapter: '0x0',
    baseAssetSymbol: 'ETH',
    wrappedBaseAssetSymbol: 'WETH',
    baseAssetDecimals: 18,
    explorerLink: 'https://arbiscan.io',
    isTestnet: true,
    networkLogoPath: '/icons/networks/arbitrum.png'
  }
} as const
