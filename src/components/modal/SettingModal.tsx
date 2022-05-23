import { TextField, Box, Typography, Button, Alert, Select, SelectChangeEvent, MenuItem, InputLabel, FormControl } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BasicModal } from './BasicModal'
import { ModalType, useModal } from './ModalContextProvider'
import axios from 'axios'
import { useWeb3Context } from '@/hooks/useWeb3Context'
import { networkConfigs } from '@/config'
import Image from 'next/image'
import { ChainId } from 'dexpools-sdk'


export const SettingModal = () => {
  const { type, close } = useModal()
  const [privateKey, setPrivateKey] = useState<string>()
  const [error, setError] = useState<string>()
  const { setAccount, setNetwork, network, setChainId } = useWeb3Context()

  useEffect(() => {
    setPrivateKey(localStorage.getItem('-wallet-account:private-key')?.toString())
  }, [])

  const connectAccount = () => {
    setError('')
    if (!privateKey) {
      setError('Please enter your account private key')
      return
    }
    axios.get('/web3/get-account-by-private-key', { params: { privateKey } }).then(({ data }) => {
      if (data.valid) {
        localStorage.setItem('-wallet-account:private-key', privateKey)
        localStorage.setItem('-wallet-account:address', data.address)
        setAccount(data.address)
        close()
      } else {
        setError(data.error)
      }
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(undefined)
    setPrivateKey(e.target.value)
  }

  const handleNetworkChange = (e: SelectChangeEvent<number>) => {
    const chainId = e.target.value as ChainId
    setChainId(chainId)
    setNetwork(networkConfigs[chainId]);
  };

  return (
    <BasicModal open={type === ModalType.Setting} setOpen={close}>
      <Typography variant="h3">Setting</Typography>
      <FormControl fullWidth sx={{ mt: 5 }}>
        <InputLabel id="network-label">Network</InputLabel>
        <Select
          labelId="network-label"
          value={network.id}
          onChange={handleNetworkChange}
        >
          {
            Object.keys(networkConfigs).map(id => (
              <MenuItem value={id} key={id} sx={{ p: 2 }}>
                <Box display="flex" alignItems='center'>
                  <Box sx={{ borderRadius: 100, overflow: 'hidden', mr: 4, width: 30, height: 30 }}>
                    <Image src={networkConfigs[id].networkLogoPath} width={30} height={30} alt={networkConfigs[id].name} />
                  </Box>
                  <Typography>{networkConfigs[id].name}</Typography>
                </Box>
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <Box sx={{ mt: 5 }}>
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}
        <TextField value={privateKey} onChange={handleChange} label="Private Key" fullWidth variant="outlined" />
      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="primary" onClick={connectAccount}>
          Connect
        </Button>
        <Button
          onClick={() => {
            close()
          }}
          variant="secondary"
          sx={{ ml: 4 }}
          disabled={!privateKey}
        >
          Close
        </Button>
      </Box>
    </BasicModal>
  )
}
