import React, { useState } from 'react';
import { IconButton, Menu } from '@mui/material';

const DropdownSetting = ({ children, icon }: { children: React.ReactNode, icon: React.ReactElement }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton loading={false} onClick={handleOpen}>
                {icon}
            </IconButton>

            <Menu anchorOrigin={{
                vertical: 'top',    // position the menu's anchor at the top of the icon
                horizontal: 'right',
            }}
                transformOrigin={{
                    vertical: 'bottom', // position the menu so it appears above the anchor point
                    horizontal: 'center',
                }} anchorEl={anchorEl} open={open} onClose={handleClose}>
                {children}
            </Menu>
        </>
    );
};

export default DropdownSetting;