import {
    MenuItem,
    ListSubheader,
    Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DropdownSetting from '../../UtilityComponents/DropdownSetting';
import { BUILDER_SIZES, BUILDER_QUALITIES } from '../../../helpers/constants';
import SettingsIcon from '@mui/icons-material/Settings';

import type { QualityAndSizeBuilderProps } from '../../../types';


const QualityAndSize: React.FC<QualityAndSizeBuilderProps> = ({ builderState, setBuilderState }) => {
    const { size, quality } = builderState;

    return (
        <DropdownSetting icon={<SettingsIcon />}>
            <ListSubheader>Size</ListSubheader>
            {BUILDER_SIZES.map(({ value, label }) => (
                <MenuItem key={value} onClick={() => setBuilderState((prev) => ({ ...prev, size: value }))}>
                    {size === value && <CheckIcon fontSize="small" />}
                    <Typography ml={size === value ? 1 : 3}>{label}</Typography>
                </MenuItem>
            ))
            }

            <ListSubheader>Quality</ListSubheader>
            {
                BUILDER_QUALITIES.map(({ value, label }) => (
                    <MenuItem key={value} onClick={() => setBuilderState((prev) => ({ ...prev, quality: value }))}>
                        {quality === value && <CheckIcon fontSize="small" />}
                        <Typography ml={quality === value ? 1 : 3}>{label}</Typography>
                    </MenuItem>
                ))
            }
        </DropdownSetting >
    );
}

export default QualityAndSize;

