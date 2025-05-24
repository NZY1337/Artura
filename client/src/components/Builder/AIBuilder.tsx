/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

// components
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import DynamicSelect from "../UtilityComponents/DynamicSelect";
import FileUpload from "../UtilityComponents/FileUpload";
import WaitingModal from "../UtilityComponents/modals/WaitingModal";
import { DESIGN_THEMES, SPACE_TYPES } from "../../helpers/constants";
// types

import { type DynamicSelectProps } from "../UtilityComponents/DynamicSelect";
// types
type OnchangeType = DynamicSelectProps['onChange'];

type AIBuilderProps = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>, stateBuilder: object) => void;
    generatedPreview: string | undefined;
    isLoading: boolean
};

const AIBuilder = ({ onSubmit, generatedPreview, isLoading }: AIBuilderProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [stateBuilder, setStateBuilder] = useState({
        spaceType: SPACE_TYPES[0].value,
        designTheme: DESIGN_THEMES[0].value,
        outputFormat: 'png',
        generatedImages: 1,
        size: '1024x1024',
        prompt: "",
        usePrompt: true,
    });

    const designThemesKeys = DESIGN_THEMES.map((designTheme) => designTheme.value);
    const designThemesLabels = DESIGN_THEMES.map((designTheme) => designTheme.label);
    const spaceTypesKeys = SPACE_TYPES.map((spaceType) => spaceType.value);
    const spaceTypesLabels = SPACE_TYPES.map((spaceType) => spaceType.label);

    const { spaceType, designTheme, prompt } = stateBuilder;
    const prefixPrompt = `Generate a design for a ${spaceType} in a ${designTheme} style. the design should have: `;
    const finalPrompt = `${prefixPrompt}${prompt}`;

    const handleChange: OnchangeType = (event) => {
        const { name, value } = event.target;
        setStateBuilder((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const finalStateBuilder = {
        n: stateBuilder.generatedImages,
        prompt: `${finalPrompt} ${stateBuilder.prompt}`,
        size: stateBuilder.size,
        output_format: stateBuilder.outputFormat,
    };

    // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { checked } = event.target;
    //     setStateBuilder((prevState) => ({
    //         ...prevState,
    //         usePrompt: checked,
    //     }));
    // };

    return (
        <Grid spacing={3} container textAlign={"left"} my={5} height={"inherit"}>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 6 }}>
                {<FileUpload preview={preview || generatedPreview} setPreview={setPreview} />}
            </Grid>

            <Grid size={{ xs: 12, xl: 6 }}>
                <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
                    <Stack spacing={3} component="form" onSubmit={(e) => onSubmit(e, finalStateBuilder)}>
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

                        {stateBuilder.usePrompt && (
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
                        )}

                        <DynamicSelect
                            label="Generation Number"
                            id="generation_number"
                            name="generatedImages"
                            onChange={handleChange}
                            value={stateBuilder.generatedImages}
                            options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                            keys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                        />

                        <DynamicSelect
                            label="Output Format"
                            id="generated_output"
                            name="outputFormat"
                            onChange={handleChange}
                            value={stateBuilder.outputFormat}
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

                        {/* <FormControlLabel
                            label="Custom AI instructions"
                            control={<Checkbox checked={stateBuilder.usePrompt} onChange={handleCheckboxChange} color="primary" />}
                        /> */}

                        <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
                            Generate Design
                        </Button>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AIBuilder;
