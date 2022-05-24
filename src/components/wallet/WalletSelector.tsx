import { Alert, Box, Button, Link, Typography } from '@mui/material'
import { useWeb3Context } from '@/hooks/useWeb3Context'
import { WalletType } from './WalletOptions'
import { UnsupportedChainIdError } from '@web3-react/core'
import { UserRejectedRequestError } from '@web3-react/walletconnect-connector'
import { NoEthereumProviderError } from '@web3-react/injected-connector'
import Image from 'next/image'

export type WalletRowProps = {
  walletName: string
  walletType: WalletType
}

const WalletRow = ({ walletName, walletType }: WalletRowProps) => {
  const { connectWallet } = useWeb3Context()

  const getWalletIcon = (walletType: WalletType) => {
    switch (walletType) {
      case WalletType.INJECTED:
        return (
          <Image
            src={`/icons/wallets/metamask.svg`}
            width="24px"
            height="24px"
            alt={`browser wallet icon`}
          />
        )
      case WalletType.WALLET_CONNECT:
        return (
          <Image
            src={`/icons/wallets/walletConnect.svg`}
            width="24px"
            height="24px"
            alt={`browser wallet icon`}
          />
        )
      case WalletType.WALLET_LINK:
        return (
          <Image
            src={`/icons/wallets/coinbase.svg`}
            width="24px"
            height="24px"
            alt={`browser wallet icon`}
          />
        )
      default:
        return null
    }
  }

  return (
    <Button
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        mb: '8px',
        color: 'text.default'
      }}
      size="large"
      onClick={() => connectWallet(walletType)}
      endIcon={getWalletIcon(walletType)}
    >
      {walletName}
    </Button>
  )
}

export enum ErrorType {
  UNSUPORTED_CHAIN,
  USER_REJECTED_REQUEST,
  UNDETERMINED_ERROR,
  NO_WALLET_DETECTED
}

export const WalletSelector = () => {
  const { error } = useWeb3Context()

  let blockingError: ErrorType | undefined = undefined
  if (error) {
    if (error instanceof UnsupportedChainIdError) {
      blockingError = ErrorType.UNSUPORTED_CHAIN
    } else if (error instanceof UserRejectedRequestError) {
      blockingError = ErrorType.USER_REJECTED_REQUEST
    } else if (error instanceof NoEthereumProviderError) {
      blockingError = ErrorType.NO_WALLET_DETECTED
    } else {
      blockingError = ErrorType.UNDETERMINED_ERROR
    }
    // TODO: add other errors
  }

  const handleBlocking = () => {
    switch (blockingError) {
      case ErrorType.UNSUPORTED_CHAIN:
        return 'Network not supported for this wallet'
      case ErrorType.USER_REJECTED_REQUEST:
        return 'Rejected connection request'
      case ErrorType.NO_WALLET_DETECTED:
        return 'Wallet not detected. Connect or install wallet and retry'
      default:
        return 'Error connecting. Try refreshing the page.'
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Connect a wallet
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: '24px' }}>
          {handleBlocking()}
        </Alert>
      )}
      <WalletRow
        key="browser_wallet"
        walletName="Metamask"
        walletType={WalletType.INJECTED}
      />
      <WalletRow
        key="walletconnect_wallet"
        walletName="WalletConnect"
        walletType={WalletType.WALLET_CONNECT}
      />
      <WalletRow
        key="walletlink_wallet"
        walletName="Coinbase"
        walletType={WalletType.WALLET_LINK}
      />
      <Typography
        variant="description"
        sx={{ mt: '22px', mb: '30px', alignSelf: 'center' }}
      >
        Need help connecting a wallet?
        <Link href="/faq" target="_blank" sx={{ color: 'text.link', ml: 4 }}>
          Read our FAQ
        </Link>
      </Typography>
      <Typography variant="helperText">
        Wallets are provided by External Providers and by selecting you agree to
        Terms of those Providers. Your access to the wallet might be reliant on
        the External Provider being operational.
      </Typography>
    </Box>
  )
}
