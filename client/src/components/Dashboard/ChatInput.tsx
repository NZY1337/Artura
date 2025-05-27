import {
    Box, TextareaAutosize,
    MenuItem,
    IconButton,
    ListSubheader,
    Divider,
    Typography,
} from '@mui/material';
import { useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import { AttachFile, Send, } from '@mui/icons-material';
import Repeat from '@mui/icons-material/Repeat';

import DropdownSetting from '../UtilityComponents/DropdownSetting';

const ChatInput = () => {
    const [size, setSize] = useState('square');
    const [quality, setQuality] = useState('high');

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 900,
            mx: 'auto',
            mt: 4,
        }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <TextareaAutosize
                    placeholder="Describe what you want to see..."
                    maxRows={4}
                    aria-label="maximum height"
                    style={{
                        width: '100%',
                        resize: 'none',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '16px',
                        backgroundColor: '#2e2f38',
                        padding: '15px',
                        overscrollBehavior: 'contain',
                        border: 'none',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                        outline: 'none'
                    }}
                />
            </Box>
            <Divider sx={{ backgroundColor: '#3c3f47', }} />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px',
                    backgroundColor: '#2e2f38',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#b0b3c0',
                    }}
                >
                    <DropdownSetting>
                        <ListSubheader>Size</ListSubheader>
                        <MenuItem onClick={() => setSize('square')}>
                            {size === 'square' && <CheckIcon fontSize="small" />}
                            <Typography ml={size === 'square' ? 1 : 3}>Square (1024×1024)</Typography>
                        </MenuItem>

                        <MenuItem onClick={() => setSize('portrait')}>
                            {size === 'portrait' && <CheckIcon fontSize="small" />}
                            <Typography ml={size === 'portrait' ? 1 : 3}>Portrait (1024×1536)</Typography>
                        </MenuItem>

                        <MenuItem onClick={() => setSize('landscape')}>
                            {size === 'landscape' && <CheckIcon fontSize="small" />}
                            <Typography ml={size === 'landscape' ? 1 : 3}>Landscape (1536×1024)</Typography>
                        </MenuItem>

                        <ListSubheader>Quality</ListSubheader>

                        <MenuItem onClick={() => setQuality('high')}>
                            {quality === 'high' && <CheckIcon fontSize="small" />}
                            <Typography ml={quality === 'high' ? 1 : 3}>High</Typography>
                        </MenuItem>

                        <MenuItem onClick={() => setQuality('medium')}>
                            {quality === 'medium' && <CheckIcon fontSize="small" />}
                            <Typography ml={quality === 'medium' ? 1 : 3}>Medium</Typography>
                        </MenuItem>

                        <MenuItem onClick={() => setQuality('low')}>
                            {quality === 'low' && <CheckIcon fontSize="small" />}
                            <Typography ml={quality === 'low' ? 1 : 3}>Low</Typography>
                        </MenuItem>
                    </DropdownSetting>
                </Box>

                {/* <IconButton sx={{ color: '#b0b3c0' }}>
                    <AttachFile />
                </IconButton> */}

                <IconButton
                    color='success'
                    loading={false}
                    sx={{
                        // bgcolor: '#2c6e66',
                        color: 'white',
                        ml: 2,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        // '&:hover': { bgcolor: '#285c57' },
                    }}
                >
                    <Send fontSize="small" />
                </IconButton>

                <IconButton 
                    color='success'
                    loading={true}
                    sx={{
                        // bgcolor: '#2c6e66',
                        color: 'white',
                        ml: 2,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        // '&:hover': { bgcolor: '#285c57' },
                    }}
                >
                    <Send fontSize="small" />
                </IconButton>
            </Box>
        </Box >
    );
};

export default ChatInput;


