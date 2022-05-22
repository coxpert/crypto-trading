import { BasicModal } from './BasicModal'
import { WalletSelector } from '../wallet/WalletSelector'
import { ModalType, useModal } from './ModalContextProvider'

export const WalletModal = () => {
  const { type, close } = useModal()

  return (
    <BasicModal open={type === ModalType.Wallet} setOpen={close}>
      <WalletSelector />
    </BasicModal>
  )
}
