import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import type { NativeSelectProps } from '../../types';

const NativeSelect = ({ optionLabels, labels, setBuilderState, name }: NativeSelectProps) => {
    const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options } = event.target;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setBuilderState((prev: NativeSelectProps['labels']) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                {/* <InputLabel shrink htmlFor="select-multiple-native">
                    {labelName}
                </InputLabel> */}
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
                    label="Native"
                    name={name}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                >
                    {optionLabels.map((label: string) => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </div >
    );
};

export default NativeSelect;