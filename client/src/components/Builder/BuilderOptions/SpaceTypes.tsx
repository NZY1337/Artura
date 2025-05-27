import DropdownSetting from "../../UtilityComponents/DropdownSetting";
import NativeSelect from "../../UtilityComponents/NativeSelect";
import BedIcon from '@mui/icons-material/Bed';

import { SPACE_TYPE } from "../../../helpers/constants";

import type { SpaceTypesBuilderProps } from '../../../types';


const SpaceTypes: React.FC<SpaceTypesBuilderProps> = ({ builderState, setBuilderState }) => {
    const { spaceType } = builderState;
    return (
        <DropdownSetting icon={<BedIcon />}>
            <NativeSelect labels={spaceType} setBuilderState={setBuilderState} optionLabels={SPACE_TYPE} name={'spaceType'} labelName="Space" />
        </DropdownSetting>
    )
}

export default SpaceTypes;