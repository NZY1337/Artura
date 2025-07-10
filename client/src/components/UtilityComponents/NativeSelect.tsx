// hooks
import { useState } from 'react';

// components
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// tpes
import type { DesignThemeProps, SpaceTypeProps, CategoryProps } from '../../types';

interface NativeSelectProps {
    optionLabels: DesignThemeProps | SpaceTypeProps | CategoryProps;
    labels: DesignThemeProps | SpaceTypeProps | CategoryProps;
    labelName: string;
    name: string;
    setBuilderState: React.Dispatch<React.SetStateAction<DesignThemeProps | SpaceTypeProps | CategoryProps>>;
}

type BuilderKeys = 'designTheme' | 'spaceType' | 'category'; // adjust as needed


// ! this is not good
type OptionLabel = {
    label: string;
    value: string;
};

const NativeSelect = ({ optionLabels, labels, setBuilderState, name }: NativeSelectProps) => {
    const [canSelect, setCanSelect] = useState(true)
    const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (!canSelect) return;

        const { options } = event.target;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setBuilderState((prev: NativeSelectProps['labels']) => ({ ...prev, [name]: value }));
    };

    const handleStopMultipleEdits = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Meta' || event.key === 'Shift') {
            setCanSelect(false);
        }
    };

    const handleStartMultipleEditsOnkeyUp = () => {
        if (!canSelect) setCanSelect(true)
    }

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                <Select<string[]>
                    multiple={true}
                    native
                    variant='standard'
                    sx={(theme) => ({
                        '& select': {
                            pr: '10px!important',
                        },
                        borderRadius: 1,
                        '& option:checked': {
                            backgroundColor: 'transparent',
                            fontWeight: 'bold', borderRadius: '5px'
                        },

                        '& option:hover': {
                            backgroundColor: '#000',
                            borderRadius: '5px',
                            color: '#eee', // may not work reliably
                        },
                        '& option': {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            padding: '8px',
                        },
                        overflowY: 'auto',
                        // maxHeight: 300,
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#888 transparent',

                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                            borderRadius: '8px',
                            border: '2px solid transparent',
                            backgroundClip: 'content-box',
                        },
                        '&::before': {
                            borderBottom: 'none !important',
                        },
                        '&::after': {
                            borderBottom: 'none !important',
                        },
                        '&:hover:not(.Mui-disabled)::before': {
                            borderBottom: 'none',
                        },
                    })}
                    value={labels}
                    // @ts-expect-error Typings are not considering `native`
                    onChange={handleChangeMultiple}
                    onKeyDown={handleStopMultipleEdits}
                    onKeyUp={handleStartMultipleEditsOnkeyUp}
                    label="Native"
                    name={name}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                >
                    {optionLabels.map((opt: OptionLabel) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </div >
    );
};

export default NativeSelect;