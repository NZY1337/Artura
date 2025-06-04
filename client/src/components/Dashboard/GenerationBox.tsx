import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
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
    onFullscreen?: (index: number) => void;
}

const GenerationBox: React.FC<Props> = ({
    item,
    onRemove,
    onEdit,
    onDownload,
    onFullscreen,
}) => {
    const backgroundImage = item.images?.[0]?.url;

    return (
        <Box
            sx={{
                aspectRatio: '1 / 1',
                width: '100%',
                position: 'relative',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid #000',
                overflow: 'hidden',
                '&:hover .overlay': {
                    opacity: 1,
                },
            }}
        >
            {/* Hover Overlay */}
            <Box
                className="overlay"
                sx={{
                    position: 'absolute',
                    top: 0,
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
                    p: 1,
                }}
            >
                {/* Top Left Close Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <IconButton
                        onClick={onRemove}
                        sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>

                {/* Bottom Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        width: '100%',
                    }}
                >
                    {/* Fullscreen */}
                    <IconButton
                        onClick={onFullscreen}
                        sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                        <FullscreenIcon fontSize="small" />
                    </IconButton>

                    {/* Edit + Download */}
                    <Box>
                        <IconButton
                            onClick={onEdit}
                            sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', mr: 1 }}
                        >
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
