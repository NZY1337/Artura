import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

// components
import FormControl from '@mui/material/FormControl';

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
            <FormControl sx={{ px: 2 }} variant="standard">
                <FormLabel id="demo-radio-buttons-group-label">{name}</FormLabel>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                    {optionLabels.map((opt) => (
                        <FormControlLabel
                            sx={{
                                ':hover span': {
                                    color: 'primary.main',
                                },
                            }}
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


