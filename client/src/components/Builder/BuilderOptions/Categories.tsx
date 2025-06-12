
// components
import DropdownSetting from "../../UtilityComponents/DropdownSetting";
import NativeSelect from "../../UtilityComponents/NativeSelect";
import CategoryIcon from '@mui/icons-material/Category';
import { CATEGORY } from "../../../helpers/constants";

// types
import type { CategoriesBuilderProps } from '../../../types';

const Categories: React.FC<CategoriesBuilderProps> = ({ builderState, setBuilderState }) => {
    const { category } = builderState;

    return (
        <DropdownSetting icon={<CategoryIcon />}>
            <NativeSelect labels={category} setBuilderState={setBuilderState} optionLabels={CATEGORY} name={'category'} labelName="Category" />
        </DropdownSetting>
    )
}

export default Categories;
