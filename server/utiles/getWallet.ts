import { Wallet, providers } from 'ethers'
import { ChainIdsProps } from 'dexpools-sdk'

export const getWallet = ({
  chainId,
  privateKey
}: {
  chainId: number
  privateKey: string
}) => {
  // get RPC provider from RPC url
  const rpcUrl = ChainIdsProps[chainId].rpc
  const provider = new providers.JsonRpcProvider(rpcUrl)

  // get wallet with private key
  const wallet = new Wallet(privateKey, provider)

  return wallet
}
