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
import { DESIGN_THEMES, SPACE_TYPES } from "../../helpers/constants";

// helpers
import { formatPrompt, extractLabelsAndValues } from "../../helpers/helpers";

// types
import type { BuilderStateProps, AIBuilderProps, SubmitBuilderProps } from "../../types";

import ChatInput from "../Dashboard/ChatInput";

const AIBuilder = ({ onHandleSubmit, generatedPreview, isLoading }: AIBuilderProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [stateBuilder, setStateBuilder] = useState<BuilderStateProps>({
        spaceType: SPACE_TYPES[0].value,
        designTheme: DESIGN_THEMES[0].value,
        output_format: 'png',
        n: 1,
        size: '1024x1024',
        prompt: "",
    });

    const [finalPrompt, prefixPrompt] = formatPrompt(stateBuilder);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string | number } }) => {
        const { name, value } = event.target;
        setStateBuilder((prevState: BuilderStateProps) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const { values: designThemesKeys, labels: designThemesLabels } = extractLabelsAndValues([...DESIGN_THEMES]);
    const { values: spaceTypesKeys, labels: spaceTypesLabels } = extractLabelsAndValues([...SPACE_TYPES]);

    const finalStateBuilder: SubmitBuilderProps = {
        n: stateBuilder.n,
        prompt: `${finalPrompt} ${stateBuilder.prompt}`,
        size: stateBuilder.size,
        output_format: stateBuilder.output_format,
    };

    return (
        <Grid spacing={3} container textAlign={"left"} my={5} height={"inherit"}>
            <Grid size={{ xs: 12, }}>
                {<FileUpload preview={preview || generatedPreview} setPreview={setPreview} />}
            </Grid>

            {/* <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
                    <Stack spacing={3} component="form" onSubmit={(e) => onHandleSubmit(e, finalStateBuilder)}>
                        <DynamicSelect
                            label="Space Type"
                            id="space-type"
                            name="spaceType"
                            onChange={handleChange}
                            value={stateBuilder.spaceType}
                            options={spaceTypesLabels}
                            keys={spaceTypesKeys}
                        />

                        <DynamicSelect
                            label="Design Themes"
                            id="design-themes"
                            name="designTheme"
                            onChange={handleChange}
                            value={stateBuilder.designTheme}
                            options={designThemesLabels}
                            keys={designThemesKeys}
                        />

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

                        <DynamicSelect
                            label="Generated Images"
                            id="generation_number"
                            name="n"
                            onChange={handleChange}
                            value={stateBuilder.n}
                            options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                            keys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                        />

                        <DynamicSelect
                            label="Output Format"
                            id="generated_output"
                            name="output_format"
                            onChange={handleChange}
                            value={stateBuilder.output_format}
                            options={["png", "jpeg", "webp"]}
                            keys={["png", "jpeg", "webp"]}
                        />
                
                        <DynamicSelect
                            label="Size"
                            id="size"
                            name="size"
                            onChange={handleChange}
                            value={stateBuilder.size}
                            options={["1024x1024 (Square)", "Portrait (1024x1536)", "Landscape (1536x1024)", "auto"]}
                            keys={["1024x1024", "1024x1536", "1536x1024", "auto"]}
                        />

                        <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
                            Generate Design
                        </Button>
                    </Stack>
                </Paper> */}

            <ChatInput />
        </Grid>
    );
};

export default AIBuilder;
