import React from 'react';
import Dialog from '@mui/material/Dialog';
import { ElementType } from 'react';

interface GenericModalProps {
    children: React.ReactNode,
    open?: boolean,
    onClose?: () => void,
    onSubmit?: () => Promise<void>,
    component?: ElementType,
    minWidth?: string
}

const GenericModal = ({ children, open, onClose, onSubmit, component = "form", minWidth = '600px' }: GenericModalProps) => {
    return (
        <Dialog 
            open={open ?? false} 
            onClose={onClose}
            PaperProps={{ 
                sx: { backgroundImage: 'none', minWidth },
            component,
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                event.stopPropagation();
                if (onSubmit) {
                    await onSubmit();
                }},
            }}>
                {children}
        </Dialog>
    );
}

export default GenericModal