import React, { useState } from "react";

// components
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import DynamicSelect from "../UtilityComponents/DynamicSelect";
import FileUpload from "../UtilityComponents/FileUpload";

// types
import { type DynamicSelectProps } from "../UtilityComponents/DynamicSelect";

// types
type OnchangeType = DynamicSelectProps['onChange'];

const AIBuilder = () => {
    const [preview, setPreview] = useState<string | null>(null);

    const spaceTypes = [
        { value: 'ST_livingRoom', label: 'Living Room' },
        { value: 'ST_bedroom', label: 'Bedroom' },
        { value: 'ST_kitchen', label: 'Kitchen' },
        { value: 'ST_bathroom', label: 'Bathroom' },
        { value: 'ST_diningRoom', label: 'Dining Room' },
        { value: 'ST_homeOffice', label: 'Home Office' },
        { value: 'ST_kidsRoom', label: 'Kids Room' },
        { value: 'ST_hallway', label: 'Hallway / Corridor' },
        { value: 'ST_balcony', label: 'Balcony / Terrace' },
        { value: 'ST_gameRoom', label: 'Game Room' },
        { value: 'ST_study', label: 'Study' },
    ];

    const designThemes = [
        { value: 'DT_modern', label: 'Modern' },
        { value: 'DT_contemporary', label: 'Contemporary' },
        { value: 'DT_minimalist', label: 'Minimalist' },
        { value: 'DT_scandinavian', label: 'Scandinavian' },
        { value: 'DT_industrial', label: 'Industrial' },
        { value: 'DT_midCentury', label: 'Mid-Century Modern' },
        { value: 'DT_traditional', label: 'Traditional' },
        { value: 'DT_classic', label: 'Classic' },
        { value: 'DT_baroque', label: 'Baroque' },
        { value: 'DT_japanese', label: 'Japanese Zen' },
        { value: 'DT_wabiSabi', label: 'Wabi-Sabi' },
        { value: 'DT_farmhouse', label: 'Farmhouse' },
        { value: 'DT_rustic', label: 'Rustic' },
        { value: 'DT_bohemian', label: 'Bohemian' },
        { value: 'DT_artDeco', label: 'Art Deco' },
        { value: 'DT_victorian', label: 'Victorian' },
        { value: 'DT_coastal', label: 'Coastal' },
        { value: 'DT_tropical', label: 'Tropical' },
        { value: 'DT_urban', label: 'Urban' },
        { value: 'DT_maximalist', label: 'Maximalist' },
        { value: 'DT_futuristic', label: 'Futuristic' },
    ];
    const designThemesKeys = designThemes.map((designTheme) => designTheme.value);
    const designThemesLabels = designThemes.map((designTheme) => designTheme.label);

    const spaceTypesKeys = spaceTypes.map((spaceType) => spaceType.value);
    const spaceTypesLabels = spaceTypes.map((spaceType) => spaceType.label);

    const [stateBuilder, setStateBuilder] = useState({
        spaceType: spaceTypes[0].value,
        designThemes: designThemes[0].value,
        numberOfDesigns: 1,
        aiIntervention: 1,
        customInstructions: "",
        useCustomInstructions: false,
    });

    const handleChange: OnchangeType = (event) => {
        const { name, value } = event.target;
        setStateBuilder((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setStateBuilder((prevState) => ({
            ...prevState,
            useCustomInstructions: checked,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <Grid spacing={3} container justifyContent="center" textAlign={"left"} my={5} height={"inherit"}>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 8 }}>
                {<FileUpload preview={preview} setPreview={setPreview} />}
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 4 }}>
                <Paper sx={{ padding: 3, color: "#fff", borderRadius: 2 }}>
                    <Stack spacing={3} component="form" onSubmit={handleSubmit}>
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
                            name="designThemes"
                            onChange={handleChange}
                            value={stateBuilder.designThemes}
                            options={designThemesLabels}
                            keys={designThemesKeys}
                        />

                        <FormControlLabel
                            label="Custom AI instructions"
                            control={<Checkbox checked={stateBuilder.useCustomInstructions} onChange={handleCheckboxChange} color="primary" />}
                        />

                        {stateBuilder.useCustomInstructions && (
                            <TextField
                                multiline
                                rows={4}
                                fullWidth
                                placeholder="e.g. A clean room with beautiful lighting and green textures."
                                name="customInstructions"
                                value={stateBuilder.customInstructions}
                                onChange={handleChange}
                            />
                        )}

                        <Button type="submit" variant="contained" fullWidth>
                            Generate Design
                        </Button>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AIBuilder;
