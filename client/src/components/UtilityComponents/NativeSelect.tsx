import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

// components
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// tpes
import type { DesignThemeProps, SpaceTypeProps, CategoryProps, EditableProjectProps } from '../../types';

type OptionItem<T extends string> = { label: string; value: T };

interface NativeSelectProps {
    optionLabels: OptionItem<DesignThemeProps | SpaceTypeProps | CategoryProps>[];
    labels: DesignThemeProps | SpaceTypeProps | CategoryProps;
    labelName: string;
    name: string;
    setBuilderState: React.Dispatch<React.SetStateAction<EditableProjectProps>>;
}

const NativeSelect = ({ optionLabels, labels, setBuilderState, name }: NativeSelectProps) => {
    const onHandleChange = (event: React.SyntheticEvent<Element, Event>) => {
        const target = event.target as HTMLInputElement;
        const value = target.value as DesignThemeProps | SpaceTypeProps | CategoryProps;

        setBuilderState((prev: EditableProjectProps) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div>
            {/* <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                <Select<string>
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

                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>

                </Select>
            </FormControl> */}

            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                <FormLabel id="demo-radio-buttons-group-label">{name}</FormLabel>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                    {optionLabels.map((opt) => (
                        <FormControlLabel
                            value={opt.value}
                            control={<Radio />}
                            checked={opt.value === labels}
                            label={opt.label}
                            onChange={onHandleChange}
                        />
                    ))}

                </RadioGroup>
            </FormControl>


        </div>
    );
};

export default NativeSelect;


