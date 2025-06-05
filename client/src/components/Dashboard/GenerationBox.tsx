import React from 'react';
import { Box, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import GetAppIcon from '@mui/icons-material/GetApp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

interface Image {
    id: string;
    url: string;
    projectId: string;
    createdAt: string;
}

interface GenerationItem {
    id: string;
    userId: string;
    prompt: string;
    category: string;
    size: string;
    quality: string;
    createdAt: string;
    updatedAt: string;
    images: Image[];
}

interface Props {
    item: GenerationItem;
    onRemove?: () => void;
    onEdit?: () => void;
    onDownload?: () => void;
    onFullscreen?: () => void;
}

const GenerationBox: React.FC<Props> = ({
    item,
    onRemove,
    onEdit,
    onDownload,
    onFullscreen,
}) => {
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            '&:hover .overlay': {
                opacity: 1,
            }
        }}>
            <Box className="overlay"
                sx={{
                    position: 'absolute',
                    top: 0,
                    padding: 1,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    color: 'white',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',

                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <IconButton onClick={onRemove} sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', }}>
                    <IconButton onClick={onFullscreen} sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }} >
                        <FullscreenIcon fontSize="small" />
                    </IconButton>

                    <Box>
                        <IconButton onClick={onEdit} sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', mr: 1 }}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            onClick={onDownload}
                            sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}
                        >
                            <GetAppIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default GenerationBox;
