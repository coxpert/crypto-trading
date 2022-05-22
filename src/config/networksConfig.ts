export const ChainIdToNetwork: Record<number, string> = {
  1: 'mainnet',
  4: 'rinkeby',
  137: 'polygon',
  1088: 'metis',
  80001: 'mumbai',
  42161: 'arbitrum_one',
  421611: 'arbitrum_rinkeby'
}

export enum ChainId {
  mainnet = 1,
  rinkeby = 4,
  polygon = 137,
  metis = 1088,
  mumbai = 80001,
  arbitrum_one = 42161,
  arbitrum_rinkeby = 421611
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
  name: string
  privateJsonRPCUrl?: string
  privateJsonRPCWSUrl?: string
  publicJsonRPCUrl: readonly string[]
  baseUniswapAdapter?: string
  wrappedBaseAssetSymbol?: string
  baseAssetSymbol: string
  baseAssetDecimals: number
  explorerLink: string
  explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string
  isTestnet?: boolean
  networkLogoPath: string
  underlyingChainId?: number
  bridge?: {
    icon: string
    name: string
    url: string
  }
}

export type BaseNetworkConfig = Omit<NetworkConfig, 'explorerLinkBuilder'>

export const networkConfigs: Record<string, BaseNetworkConfig> = {
  [ChainId.mainnet]: {
    name: 'Ethereum',
    publicJsonRPCUrl: [
      'https://cloudflare-eth.com',
      'https://rpc.flashbots.net/'
    ],
    baseUniswapAdapter: '0xc3efa200a60883a96ffe3d5b492b121d6e9a1f3f',
    baseAssetSymbol: 'ETH',
    wrappedBaseAssetSymbol: 'WETH',
    baseAssetDecimals: 18,
    explorerLink: 'https://etherscan.io',
    networkLogoPath: '/icons/networks/ethereum.svg'
  },
  [ChainId.rinkeby]: {
    name: 'Rinkeby',
    publicJsonRPCUrl: ['https://andromeda.metis.io/?owner=1088'],
    baseUniswapAdapter: '',
    baseAssetSymbol: 'ETH',
    wrappedBaseAssetSymbol: 'WETH',
    baseAssetDecimals: 18,
    explorerLink: 'https://andromeda-explorer.metis.io',
    isTestnet: true,
    networkLogoPath: '/icons/networks/ethereum.svg'
  },
  [ChainId.polygon]: {
    name: 'Polygon POS',
    publicJsonRPCUrl: ['https://polygon-rpc.com'],
    baseAssetSymbol: 'MATIC',
    wrappedBaseAssetSymbol: 'WMATIC',
    baseAssetDecimals: 18,
    explorerLink: 'https://polygonscan.com',
    networkLogoPath: '/icons/networks/polygon.svg',
    bridge: {
      icon: '/icons/bridge/polygon.svg',
      name: 'Polygon PoS Bridge',
      url: 'https://wallet.matic.network/bridge/'
    }
  },
  [ChainId.metis]: {
    name: 'Metis',
    publicJsonRPCUrl: ['https://api.avax.network/ext/bc/C/rpc'],
    baseAssetSymbol: 'METIS',
    wrappedBaseAssetSymbol: 'METIS',
    baseAssetDecimals: 18,
    explorerLink: 'https://cchain.explorer.avax.network',
    networkLogoPath: '/icons/networks/avalanche.svg',
    bridge: {
      icon: '/icons/bridge/avalanche.svg',
      name: 'Avalanche Bridge',
      url: 'https://bridge.avax.network/'
    }
  },
  [ChainId.mumbai]: {
    name: 'Mumbai',
    publicJsonRPCUrl: ['https://rpc-mumbai.maticvigil.com'],
    baseAssetSymbol: 'MATIC',
    wrappedBaseAssetSymbol: 'WMATIC',
    baseAssetDecimals: 18,
    explorerLink: 'https://explorer-mumbai.maticvigil.com',
    // rpcOnly: true,
    isTestnet: true,
    networkLogoPath: '/icons/networks/polygon.svg'
  },
  [ChainId.arbitrum_rinkeby]: {
    name: 'Arbitrum Rinkeby',
    publicJsonRPCUrl: ['https://rinkeby.arbitrum.io/rpc'],
    baseUniswapAdapter: '0x0',
    baseAssetSymbol: 'ETH',
    wrappedBaseAssetSymbol: 'WETH',
    baseAssetDecimals: 18,
    explorerLink: 'https://testnet.arbiscan.io',
    // rpcOnly: true,
    // usdMarket: true,
    isTestnet: true,
    networkLogoPath: '/icons/networks/arbitrum.svg',
    bridge: {
      icon: '/icons/bridge/arbitrum.svg',
      name: 'Arbitrum Bridge',
      url: 'https://bridge.arbitrum.io'
    }
  },
  [ChainId.arbitrum_one]: {
    name: 'Arbitrum',
    publicJsonRPCUrl: ['https://arb1.arbitrum.io/rpc'],
    // protocolDataUrl: '',
    baseUniswapAdapter: '0x0',
    baseAssetSymbol: 'ETH',
    wrappedBaseAssetSymbol: 'WETH',
    baseAssetDecimals: 18,
    explorerLink: 'https://arbiscan.io',
    // rpcOnly: true,
    // usdMarket: true,
    networkLogoPath: '/icons/networks/arbitrum.svg',
    bridge: {
      icon: '/icons/bridge/arbitrum.svg',
      name: 'Arbitrum Bridge',
      url: 'https://bridge.arbitrum.io'
    }
  }
} as const
