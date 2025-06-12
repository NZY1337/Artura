// hooks
import { useState } from "react";

// icons
import CloseIcon from '@mui/icons-material/Close';

// components
import { Card, CardMedia, Box, IconButton } from '@mui/material';
import BuilderOptions from "./BuilderOptions";
import BuilderOptionsPreview from "./BuilderOptionsPreview";

// utils
import { DESIGN_THEME, SPACE_TYPE, CATEGORY } from "../../helpers/constants";

// types
import type { AiBuilderStateProps, AIBuilderProps } from "../../types";

type GalleryProps = {
    images: string[];
    onRemove: (index: number) => void;
};

const AIBuilder = ({ onHandleSubmit, isLoading }: AIBuilderProps) => {
    const [builderState, setBuilderState] = useState<AiBuilderStateProps>({
        size: '1536x1024',
        quality: 'high',
        spaceType: [SPACE_TYPE[0]],
        designTheme: [DESIGN_THEME[0]],
        category: [CATEGORY[0]],
        prompt: '',
        n: 1,
        output_format: 'png',
        images: []
    });

    const handleRemoveImage = (index: number) => {
        console.log(index);
        const newImages = [...builderState.images];
        newImages.splice(index, 1);
        setBuilderState({ ...builderState, images: newImages });
    };

    return (
        <>
            {builderState.images.length > 0 && (
                <Gallery images={builderState.images} onRemove={handleRemoveImage} />
            )}
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
                        <CardMedia component="img" image={image} alt={`Image ${index + 1}`} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Card>

                    <IconButton
                        onClick={() => onRemove(index)}
                        size="small"
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

