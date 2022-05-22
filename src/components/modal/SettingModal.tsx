import { TextField, Box, Typography, Button } from '@mui/material';
import React from 'react';
import { BasicModal } from './BasicModal';
import { ModalType, useModal } from './ModalContextProvider';

export const SettingModal = () => {
    const { type, close } = useModal()

    const handleClick = () => {

    }

    return (
        <BasicModal open={type === ModalType.Setting} setOpen={close}>
            <Typography variant="h3">Setting</Typography>
            <Box sx={{ mt: 5 }}>
                <TextField label="Private Key" fullWidth variant="outlined" />
            </Box>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary" onClick={handleClick} >Save</Button>
                <Button onClick={() => { close() }} variant="secondary" sx={{ ml: 4 }} >Close</Button>
            </Box>
        </BasicModal>
    );
};
