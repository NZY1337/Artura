// hooks
import { useColorScheme } from "@mui/material";
import { useState } from "react";

// components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FileUpload from "../UtilityComponents/FileUpload";
import BuilderOptions from "./BuilderOptions";

// utils
import { DESIGN_THEME, SPACE_TYPE } from "../../helpers/constants";

// types
import type { AiBuilderStateProps, AIBuilderProps } from "../../types";

const AIBuilder = ({ onHandleSubmit, generatedPreview, isLoading }: AIBuilderProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const { mode } = useColorScheme();

    const [builderState, setBuilderState] = useState<AiBuilderStateProps>({
        size: '1536x1024',
        quality: 'high',
        spaceType: [SPACE_TYPE[0]],
        designTheme: [DESIGN_THEME[0]],
        prompt: '',
        n: 1,
        output_format: 'png',
    });

    const decider = mode === 'light' ? '#000' : '#fff'

    return (
        <Grid spacing={3} container textAlign={"left"} justifyContent={"center"}>
            <Grid size={{ xs: 12, }}>
                {<FileUpload preview={preview || generatedPreview} setPreview={setPreview} />}
            </Grid>

            <Grid size={{ xs: 12, lg: 8 }} >
                <BuilderOptions onHandleSubmit={onHandleSubmit} setBuilderState={setBuilderState} builderState={builderState} isLoading={isLoading} />

                <Stack direction="row" spacing={3} justifyContent="flex-start" mt={2}>
                    <Typography variant="caption" color="gray">
                        quality: <span style={{ color: decider }}>{builderState.quality}</span>
                    </Typography>
                    <Typography variant="caption" color="gray">
                        size: <span style={{ color: decider }}>{builderState.size}</span>
                    </Typography>
                    <Typography variant="caption" color="gray">
                        Design Theme: <span style={{ color: decider }}>{builderState.designTheme}</span>
                    </Typography>
                    <Typography variant="caption" color="gray">
                        Space Type: <span style={{ color: decider }}>{builderState.spaceType}</span>
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default AIBuilder;
