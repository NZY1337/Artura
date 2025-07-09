// components
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import DropdownSetting from '../../UtilityComponents/DropdownSetting';

import type { QualityAndSizeBuilderProps } from '../../../types';

// icons
import { Icon } from '@mui/material';
function valuetext(value: number) {
    return `${value}°C`;
}

const NumberOfGenerations: React.FC<QualityAndSizeBuilderProps> = ({ builderState, setBuilderState }) => {
    const { n } = builderState;

    console.log(n)

    return (
        <DropdownSetting icon={<Icon><Typography fontWeight={'bold'} variant='body1'>{n}x</Typography></Icon>}>
            <Box sx={{ width: 300, padding: "0 15px" }}>
                <Typography>Number of Generations</Typography>
                <Slider
                    defaultValue={n}
                    shiftStep={1}
                    step={1}
                    marks
                    size='small'
                    min={1}
                    max={10}
                    getAriaValueText={valuetext}
                    onChange={(_event, value) => {
                        setBuilderState((prev: typeof builderState) => ({ ...prev, n: value as number }))
                    }}
                />
            </Box>
        </DropdownSetting >
    );
}

export default NumberOfGenerations;





