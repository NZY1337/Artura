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
import { type DynamicSelectProps } from "../UtilityComponents/DynamicSelect";
import { useLocation } from "react-router-dom";
import { Mode } from "@mui/icons-material";

// types
type OnchangeType = DynamicSelectProps['onChange'];

const AIBuilder = () => {
  const location = useLocation();
  const [preview, setPreview] = useState<string | null>(null);

  console.log(location.pathname);

 
  const [stateBuilder, setStateBuilder] = useState({
    mode: "Beautiful Redesign",
    style: "Modern",
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
                id="interior-space" 
                name="interiorSpace" 
                onChange={handleChange} 
                value={stateBuilder.mode}
                options={["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office"]}
                keys={["livingRoom", "bedroom", "kitchen", "bathroom", "office"]}
            />
            
            <DynamicSelect 
                label="Design Themes" 
                id="design-themes" 
                name="designThemes" 
                onChange={handleChange} 
                value={stateBuilder.style}
                options={["Modern", "Minimalist", "Industrial", "Scandinavian", "Bohemian"]}
                keys={["modern", "minimalist", "industrial", "scandinavian", "bohemian"]}
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
