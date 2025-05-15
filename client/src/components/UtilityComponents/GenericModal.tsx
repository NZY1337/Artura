import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';

interface GenericModalProps {
    children: React.ReactNode,
    onClose: () => void,
    open: boolean;
}

const style = {
    maxWidth: 400,
    // bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const GenericModal = ({ children, open, onClose, }: GenericModalProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <Box sx={style}>
                {children}
            </Box>
        </Dialog >
    );
}

export default GenericModal