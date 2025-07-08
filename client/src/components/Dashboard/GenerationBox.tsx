import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import GetAppIcon from "@mui/icons-material/GetApp";
import FullscreenIcon from "@mui/icons-material/Fullscreen";


interface GenerationBoxProps {
    onRemove?: () => void;
    onEdit?: () => void;
    onDownload?: () => void;
    onFullscreen?: () => void;
}

const GenerationBox: React.FC<GenerationBoxProps> = ({
    onRemove,
    onEdit,
    onDownload,
    onFullscreen,
}) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                "&:hover .overlay": {
                    opacity: 1,
                },
            }}
        >
            <Box
                className="overlay"
                sx={{
                    padding: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    color: "white",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <IconButton
                        onClick={onRemove}
                        sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        width: "100%",
                    }}
                >
                    <IconButton
                        onClick={onFullscreen}
                        sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <FullscreenIcon fontSize="small" />
                    </IconButton>

                    <Box>
                        <IconButton
                            onClick={onEdit}
                            sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)", mr: 1 }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            onClick={onDownload}
                            sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            <GetAppIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default GenerationBox;
