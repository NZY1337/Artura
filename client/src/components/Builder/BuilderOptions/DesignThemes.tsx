
// components
import DropdownSetting from "../../UtilityComponents/DropdownSetting";
import NativeSelect from "../../UtilityComponents/NativeSelect";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import { DESIGN_THEME } from "../../../helpers/constants";

// types
import type { DesignThemesBuilderProps } from '../../../types';

const DesignThemes: React.FC<DesignThemesBuilderProps> = ({ builderState, setBuilderState }) => {
    const { designTheme } = builderState;

    return (
        <DropdownSetting icon={<ViewQuiltIcon />}>
            <NativeSelect labels={designTheme} setBuilderState={setBuilderState} optionLabels={DESIGN_THEME} name={'designTheme'} labelName="Theme" />
        </DropdownSetting>
    )
}

export default DesignThemes;
