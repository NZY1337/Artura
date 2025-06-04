
import { useState } from 'react';
import { useNotifications } from '@toolpad/core';
// components
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';
import { Send } from '@mui/icons-material';
import QualityAndSize from './BuilderOptions/QaulityAndSize';
import SpaceTypes from './BuilderOptions/SpaceTypes';
import DesignThemes from './BuilderOptions/DesignThemes';
import Categories from './BuilderOptions/Categories';
// import AttachFile from '@mui/icons-material/AttachFile';\

import { CHARS_LIMIT } from '../../helpers/constants';

// hooks
import { useColorScheme } from "@mui/material";

// types
import type { BuilderOptionsProps } from '../../types';

const BuilderOptions = ({ onHandleSubmit, builderState, setBuilderState, isLoading }: BuilderOptionsProps) => {
    const { prompt } = builderState;
    const { mode } = useColorScheme();
    const [charCount, setCharCount] = useState<number>(0);
    const notifications = useNotifications();

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setCharCount(value.length);

        if (value.length == 500) {
            notifications.show('You have reached the 500 character limit.', {
                severity: 'warning',
                autoHideDuration: 2000,
            });
        }

        setBuilderState((prev: typeof builderState) => ({ ...prev, prompt: value }));
    }

    return (
        <Box sx={{ width: '100%', }} component={'form'}>
            <Typography variant='body2' textAlign={'right'} color='orange'>characters: {CHARS_LIMIT - charCount}</Typography>
            <TextareaAutosize
                placeholder={`Eg: generate a beautiful ${builderState.spaceType} design in a ${builderState.designTheme} style with ...`}
                value={prompt}
                onChange={(e) => handlePromptChange(e)}
                maxRows={4}
                maxLength={CHARS_LIMIT}
                aria-label="maximum height"
                name='prompt'
                style={{
                    width: '100%',
                    resize: 'none',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                    backgroundColor: mode === 'dark' ? '#fff' : '#2e2f38',
                    color: mode === 'dark' ? '#2e2f38' : '#fff',
                    padding: '15px',
                    overscrollBehavior: 'contain',
                    border: 'none',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    outline: 'none',
                }}
            />

            <Divider sx={{ backgroundColor: '#3c3f47' }} />

            <Box sx={{
                display: 'flex', justifyContent: 'space-between', padding: '8px',
                backgroundColor: '#2e2f38', width: '100%',
            }}>
                <Box>
                    <Categories setBuilderState={setBuilderState} builderState={builderState} />
                    <SpaceTypes setBuilderState={setBuilderState} builderState={builderState} />
                    <DesignThemes setBuilderState={setBuilderState} builderState={builderState} />
                    <QualityAndSize setBuilderState={setBuilderState} builderState={builderState} />
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
