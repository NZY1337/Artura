// hooks
import { useState } from "react";

// components
import Grid from "@mui/material/Grid";
import FileUpload from "../UtilityComponents/FileUpload";
import BuilderOptions from "./BuilderOptions";
import BuilderOptionsPreview from "./BuilderOptionsPreview";

// utils
import { DESIGN_THEME, SPACE_TYPE, CATEGORIES } from "../../helpers/constants";

// types
import type { AiBuilderStateProps, AIBuilderProps } from "../../types";

const AIBuilder = ({ onHandleSubmit, generatedPreview, isLoading }: AIBuilderProps) => {
    const [preview, setPreview] = useState<string | null>(null);

    const [builderState, setBuilderState] = useState<AiBuilderStateProps>({
        size: '1536x1024',
        quality: 'high',
        spaceType: [SPACE_TYPE[0]],
        designTheme: [DESIGN_THEME[0]],
        categories: CATEGORIES[0],
        prompt: '',
        n: 1,
        output_format: 'png',
    });

    return (
        <Grid spacing={3} container textAlign={"left"} justifyContent={"center"}>
            <Grid size={{ xs: 12, }}>
                {<FileUpload preview={preview || generatedPreview} setPreview={setPreview} />}
            </Grid>

            <Grid size={{ xs: 12, lg: 8 }} >
                <BuilderOptions onHandleSubmit={onHandleSubmit} setBuilderState={setBuilderState} builderState={builderState} isLoading={isLoading} />

                <BuilderOptionsPreview builderState={builderState} />
            </Grid>
        </Grid>
    );
};

export default AIBuilder;
