// hooks
import { useState } from "react";

// components
import Grid from "@mui/material/Grid";
import FileUpload from "../UtilityComponents/FileUpload";
import BuilderOptions from "./BuilderOptions";
import BuilderOptionsPreview from "./BuilderOptionsPreview";

// utils
import { DESIGN_THEME, SPACE_TYPE, CATEGORY } from "../../helpers/constants";

// types
import type { AiBuilderStateProps, AIBuilderProps } from "../../types";

const AIBuilder = ({ onHandleSubmit, isLoading }: AIBuilderProps) => {

    const [builderState, setBuilderState] = useState<AiBuilderStateProps>({
        size: '1536x1024',
        quality: 'high',
        spaceType: [SPACE_TYPE[0]],
        designTheme: [DESIGN_THEME[0]],
        category: [CATEGORY[0]],
        prompt: '',
        n: 1,
        output_format: 'png',
    });

    // const { category } = builderState;
    // const showFileUpload = category.includes(CATEGORY[1]) || category.includes(CATEGORY[2]);

    return (
        <Grid size={{ xs: 12, lg: 10 }} >
            <BuilderOptions onHandleSubmit={onHandleSubmit} setBuilderState={setBuilderState} builderState={builderState} isLoading={isLoading} />
            <BuilderOptionsPreview builderState={builderState} />
        </Grid >

    );
};

export default AIBuilder;
