import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';

interface GenericDialogProps {
    children: React.ReactNode,
    onClose: () => void,
    open: boolean;
    sx?: object
}


const GenericDialog = ({ children, open, onClose }: GenericDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <Box sx={{ height: 'inherit' }}>
                {children}
            </Box>
        </Dialog >
    );
}

export default GenericDialog