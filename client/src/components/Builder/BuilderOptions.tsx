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
// import AttachFile from '@mui/icons-material/AttachFile';

import type { BuilderOptionsProps } from '../../types';

const BuilderOptions = ({ onHandleSubmit, builderState, setBuilderState, isLoading }: BuilderOptionsProps) => {
    const { prompt } = builderState;

    return (
        <Box sx={{ width: '100%', }} component={'form'}>
            <TextareaAutosize
                placeholder={`Eg: generate a beautiful ${builderState.spaceType} design in a ${builderState.designTheme} style with ...`}
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

            <Divider sx={{ backgroundColor: '#3c3f47' }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#2e2f38', width: '100%', }}>
                <Box>
                    <QualityAndSize setBuilderState={setBuilderState} builderState={builderState} />
                    <SpaceTypes setBuilderState={setBuilderState} builderState={builderState} />
                    <DesignThemes setBuilderState={setBuilderState} builderState={builderState} />
                </Box>

                <IconButton color='success' loading={isLoading} onClick={() => onHandleSubmit(builderState)}
                    sx={{
                        ml: 2,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
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
