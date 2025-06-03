
// components
import DropdownSetting from "../../UtilityComponents/DropdownSetting";
import NativeSelect from "../../UtilityComponents/NativeSelect";
import CategoryIcon from '@mui/icons-material/Category';
import { CATEGORIES } from "../../../helpers/constants";

// types
import type { CategoriesBuilderProps } from '../../../types';

const Categories: React.FC<CategoriesBuilderProps> = ({ builderState, setBuilderState }) => {
    const { designTheme } = builderState;

    return (
        <DropdownSetting icon={<CategoryIcon />}>
            <NativeSelect labels={designTheme} setBuilderState={setBuilderState} optionLabels={CATEGORIES} name={'categories'} labelName="Categories" />
        </DropdownSetting>
    )
}

export default Categories;
