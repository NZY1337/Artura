import {
    Box,
    TextareaAutosize,
    IconButton,
    Divider,
} from '@mui/material';
import { Send } from '@mui/icons-material';

import QualityAndSize from './BuilderOptions/QaulityAndSize';
import SpaceTypes from './BuilderOptions/SpaceTypes';
import DesignThemes from './BuilderOptions/DesignThemes';
import AttachFile from '@mui/icons-material/AttachFile';

import type { BuilderOptionsProps } from '../../types';

const BuilderOptions = ({ builderState, setBuilderState, isLoading }: BuilderOptionsProps) => {
    const { prompt } = builderState;
    return (
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 900, mx: 'auto', mt: 4 }} >
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', }} >
                <TextareaAutosize
                    placeholder="A serene tropical-style bathroom with natural stone flooring, bamboo accents, lush green plants, and a freestanding bathtub near a large window. Warm ambient lighting, wooden textures, and open-air vibes create a spa-like atmosphere. Soft sunlight filters through sheer curtains, evoking a relaxing island retreat."
                    value={prompt}
                    onChange={(e) => { setBuilderState((prev: typeof builderState) => ({ ...prev, prompt: e.target.value })) }}
                    maxRows={4}
                    aria-label="maximum height"
                    name='prompt'
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

            <Divider sx={{ backgroundColor: '#3c3f47' }} />

            <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px', backgroundColor: '#2e2f38', }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#b0b3c0' }} >
                    <QualityAndSize setBuilderState={setBuilderState} builderState={builderState} />
                    <SpaceTypes setBuilderState={setBuilderState} builderState={builderState} />
                    <DesignThemes setBuilderState={setBuilderState} builderState={builderState} />
                </Box>

                <IconButton color='success' loading={isLoading}
                    sx={{
                        // bgcolor: '#2c6e66',
                        color: 'white',
                        ml: 2,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        // '&:hover': { bgcolor: '#285c57' },
                    }}>
                    <Send fontSize="small" />
                </IconButton>
            </Box>
        </Box >
    );
};

export default BuilderOptions;

{/* <IconButton sx={{ color: '#b0b3c0' }}>
    <AttachFile />
</IconButton> */}
