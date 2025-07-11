// hooks
import { useState } from "react";

// icons
import CloseIcon from '@mui/icons-material/Close';

// components
import { Card, CardMedia, Box, IconButton } from '@mui/material';
import BuilderOptions from "./BuilderOptions";
import BuilderOptionsPreview from "./BuilderOptionsPreview";

// types
import type { EditableProjectProps } from "../../types";

type GalleryProps = {
    images: EditableProjectProps['images'];
    onRemove: (index: number) => void;
};

export interface AIBuilderProps {
    isLoading: boolean;
    onHandleSubmit: (stateBuilder: EditableProjectProps) => void;
};

const AIBuilder = ({ onHandleSubmit, isLoading }: AIBuilderProps) => {
    const [builderState, setBuilderState] = useState<EditableProjectProps>({
        size: 'SIZE_1024x1024',
        quality: 'HIGH',
        spaceType: 'LIVING_ROOM',
        designTheme: 'MODERN',
        category: 'DESIGN_GENERATOR',
        prompt: '',
        n: 1,
        outputFormat: 'PNG',
        images: [],
    });

    const handleRemoveImage = (index: number) => {
        const newImages = [...builderState.images];
        newImages.splice(index, 1);
        setBuilderState({ ...builderState, images: newImages });
    };

    return (
        <>
            {builderState.images.length > 0 &&  <Gallery images={builderState.images} onRemove={handleRemoveImage} />}
            <BuilderOptions onHandleSubmit={onHandleSubmit} setBuilderState={setBuilderState} builderState={builderState} isLoading={isLoading} />
            <BuilderOptionsPreview builderState={builderState} />
        </>
    );
};

export default AIBuilder;

const Gallery = ({ images, onRemove }: GalleryProps) => {
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

