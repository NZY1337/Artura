/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

// components
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import DynamicSelect from "../UtilityComponents/DynamicSelect";
import FileUpload from "../UtilityComponents/FileUpload";
import { DESIGN_THEME, SPACE_TYPE } from "../../helpers/constants";

// helpers
import { formatPrompt, extractLabelsAndValues } from "../../helpers/helpers";

// types
import type { AiBuilderStateProps, AIBuilderProps } from "../../types";

import BuilderOptions from "./BuilderOptions";

const AIBuilder = ({ onHandleSubmit, generatedPreview, isLoading }: AIBuilderProps) => {
    const [preview, setPreview] = useState<string | null>(null);

    const [builderState, setBuilderState] = useState<AiBuilderStateProps>({
        size: '1536x1024',
        quality: 'high',
        spaceType: [SPACE_TYPE[0]],
        designTheme: [DESIGN_THEME[0]],
        prompt: '',
        n: 1,
        output_format: 'png',
    });

    console.log(builderState)

    // const stateBuilder: SubmitBuilderProps = {
    //     n: 1,
    //     prompt: `${finalPrompt} ${stateBuilder.prompt}`,
    //     size: stateBuilder.size,
    //     output_format: stateBuilder.output_format,
    // };

    // const [finalPrompt, prefixPrompt] = formatPrompt(stateBuilder);

    // const [stateBuilder, setStateBuilder] = useState<BuilderStateProps>({
    //     spaceType: SPACE_TYPES[0].value,
    //     designTheme: DESIGN_THEMES[0].value,
    //     output_format: 'png',
    //     n: 1,
    //     size: '1024x1024',
    //     prompt: "",
    // });

    // const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string | number } }) => {
    //     const { name, value } = event.target;
    //     setStateBuilder((prevState: BuilderStateProps) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };

    return (
        <Grid spacing={3} container textAlign={"left"} my={5} height={"inherit"}>
            <Grid size={{ xs: 12, }}>
                {<FileUpload preview={preview || generatedPreview} setPreview={setPreview} />}
            </Grid>

            {/* <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
                    <Stack spacing={3} component="form" onSubmit={(e) => onHandleSubmit(e, finalStateBuilder)}>
                        <TextField
                            multiline
                            rows={8}
                            sx={{ mt: 0, p: 0 }}
                            fullWidth
                            placeholder={finalPrompt}
                            name="prompt"
                            value={stateBuilder.prompt}
                            onChange={(e) => {
                                let p = "";
                                if (e.target.value.startsWith(prefixPrompt)) {
                                    p = e.target.value.slice(prefixPrompt.length);
                                } else {
                                    p = e.target.value;
                                }
                                setStateBuilder(prev => {
                                    return {
                                        ...prev,
                                        prompt: p
                                    }
                                })
                            }}
                        />
                      

                        <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
                            Generate Design
                        </Button>
                    </Stack>
                </Paper> */}

            <BuilderOptions setBuilderState={setBuilderState} builderState={builderState} isLoading={isLoading} />
        </Grid>
    );
};

export default AIBuilder;
