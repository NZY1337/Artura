
// components
import DropdownSetting from "../../UtilityComponents/DropdownSetting";
import NativeSelect from "../../UtilityComponents/NativeSelect";
import CategoryIcon from '@mui/icons-material/Category';
import { DESIGN_THEME } from "../../../helpers/constants";

// types
import type { CategoriesBuilderProps } from '../../../types';

const Categories: React.FC<CategoriesBuilderProps> = ({ builderState, setBuilderState }) => {
    const { designTheme } = builderState;

    return (
        <DropdownSetting icon={<CategoryIcon />}>
            <NativeSelect labels={designTheme} setBuilderState={setBuilderState} optionLabels={DESIGN_THEME} name={'designTheme'} labelName="Theme" />
        </DropdownSetting>
    )
}

export default Categories;
