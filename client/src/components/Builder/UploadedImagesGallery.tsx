// icons
import CloseIcon from '@mui/icons-material/Close';

// components
import { Card, CardMedia, Box, IconButton } from '@mui/material';

// types
import type { EditableProjectProps } from "../../types";

type UploadedImagesGalleryProps = {
    images: EditableProjectProps['images'];
    onRemove: (index: number) => void;
};

const UploadedImagesGallery = ({ images, onRemove }: UploadedImagesGalleryProps) => {
    console.log(images);
    return (
        <Box sx={{ mb: 2, overflowY: 'auto', display: 'flex', gap: 2, p: 2, backgroundColor: '#2e2f38', borderRadius: 2 }}>
            {images.map((image, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                    <Card sx={{ width: 60, height: 60 }}>
                        {'preview' in image &&
                            <CardMedia component="img" image={image.preview} alt={`Image ${index + 1}`} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        }
                    </Card>

                    <IconButton onClick={() => onRemove(index)} size="small"
                        sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            backgroundColor: 'green',
                            color: 'white',
                            width: 24,
                            height: 24,
                            zIndex: 1,
                            '&:hover': {
                                backgroundColor: '#006400',
                            },
                        }}>
                        <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                </Box>
            ))}
        </Box>
    );
};

export default UploadedImagesGallery;