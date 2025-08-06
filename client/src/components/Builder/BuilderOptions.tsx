
import { useNotifications } from '@toolpad/core';

// components
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Send } from '@mui/icons-material';
import QualityAndSize from './BuilderOptions/QaulityAndSize';
import NumberOfGenerations from './BuilderOptions/NumberOfGenerations ';
import SpaceTypes from './BuilderOptions/SpaceTypes';
import DesignThemes from './BuilderOptions/DesignThemes';
import Categories from './BuilderOptions/Categories';
import FileUpload from '../UtilityComponents/FileUpload';
import Button from '@mui/material/Button';

// import AttachFile from '@mui/icons-material/AttachFile';

// constants
import { CHARS_LIMIT, CATEGORY } from '../../helpers/constants';

// hooks
import { useColorScheme } from "@mui/material";

// types
import type { BuilderOptionsProps } from '../../types';

const BuilderOptions = ({ builderState, charCount, setCharCount, isLoading, setBuilderState, onHandleSubmit, handleGenerateBaseDesign }: BuilderOptionsProps) => {
    const { prompt } = builderState;
    const { mode } = useColorScheme();
    const notifications = useNotifications();

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setCharCount(value.length);

        if (value.length >= 500) {
            notifications.show('You have reached the 500 character limit.', {
                severity: 'warning',
                autoHideDuration: 2000,
            });
        }

        setBuilderState((prev: typeof builderState) => ({ ...prev, prompt: value }));
    }

    return (
        <Box sx={{ width: '100%' }} component={'form'}>
            <Typography variant='body2' textAlign={'right'} color='orange'>characters: {CHARS_LIMIT - charCount}</Typography>
            <TextareaAutosize
                placeholder='Describe your design, chose from the options below.'
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

            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#2e2f38', width: '100%' }}>
                <Box sx={{ display: 'flex' }}>
                    <Categories setBuilderState={setBuilderState} builderState={builderState} />
                    <SpaceTypes setBuilderState={setBuilderState} builderState={builderState} />
                    <DesignThemes setBuilderState={setBuilderState} builderState={builderState} />
                    <QualityAndSize setBuilderState={setBuilderState} builderState={builderState} />
                    <NumberOfGenerations setBuilderState={setBuilderState} builderState={builderState} />

                    {builderState.category !== CATEGORY[0].value && (
                        <FileUpload setBuilderState={setBuilderState} builderState={builderState} />
                    )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={handleGenerateBaseDesign}>Generate Base Design</Button>
                    <IconButton color='success' loading={isLoading} onClick={() => onHandleSubmit(builderState)}
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                        }}>
                        <Send fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </Box >
    );
};

export default BuilderOptions;
