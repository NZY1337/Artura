import React, { useState } from 'react';
import { IconButton, Menu } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const DropdownSetting = ({ children }: { children: React.ReactNode }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    console.log(open)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <SettingsIcon />
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