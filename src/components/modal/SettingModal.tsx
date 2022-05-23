import { TextField, Box, Typography, Button } from '@mui/material'
import React from 'react'
import { BasicModal } from './BasicModal'
import { ModalType, useModal } from './ModalContextProvider'


export const SettingModal = () => {
  const { type, close } = useModal()

  const handleClick = () => {
    web3.eth.accounts.privateKeyToAccount('9dad3f06813a4677039620e459280c1dc2c826d267c3fbbc213ef1f50fa17d57').then(res => {
      console.log(res)
    })
  }

  return (
    <BasicModal open={type === ModalType.Setting} setOpen={close}>
      <Typography variant="h3">Setting</Typography>
      <Box sx={{ mt: 5 }}>
        <TextField label="Private Key" fullWidth variant="outlined" />
      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="primary" onClick={handleClick}>
          Save
        </Button>
        <Button
          onClick={() => {
            close()
          }}
          variant="secondary"
          sx={{ ml: 4 }}
        >
          Close
        </Button>
      </Box>
    </BasicModal>
  )
}
