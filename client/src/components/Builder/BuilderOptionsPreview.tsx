// hooks
import { useColorScheme } from "@mui/material";

// components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { AiBuilderStateProps } from "../../types";
const BuilderOptionsPreview: React.FC<{ builderState: AiBuilderStateProps }> = ({ builderState }) => {
    const { mode } = useColorScheme();

    const decider = mode === 'light' ? '#000' : '#fff';

    return (

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
    );
};

export default BuilderOptionsPreview;
