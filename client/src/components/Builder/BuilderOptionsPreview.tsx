// hooks
import { useColorScheme } from "@mui/material";

// components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { AiBuilderStateProps } from "../../types";
const BuilderOptionsPreview: React.FC<{ builderState: AiBuilderStateProps }> = ({ builderState }) => {
    const { mode } = useColorScheme();

    const chooseMode = mode === 'light' ? '#000' : '#fff';

    return (

        <Stack direction="row" spacing={3} justifyContent="flex-start" mt={2}>
            <Typography variant="caption" color="gray">
                category: <span style={{ color: chooseMode }}>{builderState.category[0]}</span>
            </Typography>
            <Typography variant="caption" color="gray">
                Space Type: <span style={{ color: chooseMode }}>{builderState.spaceType[0]}</span>
            </Typography>
            <Typography variant="caption" color="gray">
                Design Theme: <span style={{ color: chooseMode }}>{builderState.designTheme[0]}</span>
            </Typography>

            <Typography variant="caption" color="gray">
                quality: <span style={{ color: chooseMode }}>{builderState.quality}</span>
            </Typography>
            <Typography variant="caption" color="gray">
                size: <span style={{ color: chooseMode }}>{builderState.size}</span>
            </Typography>
        </Stack>
    );
};

export default BuilderOptionsPreview;
