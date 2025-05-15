import React from 'react';
import Dialog from '@mui/material/Dialog';

interface GenericModalProps {
    children: React.ReactNode,
    onClose: () => void,
    open: boolean;
    sx?: object
}


const GenericModal = ({ children, open, onClose }: GenericModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullScreen={true} >
            {children}
        </Dialog >
    );
}

export default GenericModal