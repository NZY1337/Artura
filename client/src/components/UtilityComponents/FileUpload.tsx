import React, { useRef, useState } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Rotate90DegreesCcw } from "@mui/icons-material";

import { ROTATION } from "../../helpers/constants";

import { useNotifications } from '@toolpad/core/useNotifications';

type FileUploadProps = {
    preview: string | null,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
}

const FileUpload = ({ preview, setPreview }: FileUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const notifications = useNotifications();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files?.[0];

        if (file) {
            // Validate file type
            if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
                notifications.show('Only PNG, JPEG, and JPG files are allowed!', {
                    severity: 'error',
                    autoHideDuration: 3000,
                });
                return;
            }

            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset file input
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Stack spacing={2} alignItems="center" height={"50vh"}
            sx={{
                border: "5px",
                borderStyle: "double",
                borderColor: "grey.800",
                padding: 3,
                borderRadius: 2,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { borderColor: "grey.700" },
            }}>
            {!preview ? (
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    width={"100%"}
                    height={'100%'}
                    onClick={handleClick}
                >
                    <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body2">
                        Upload an image here to get started </Typography>
                    <Typography variant="body2">
                        & unlock all the <b style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.5), 0 0 30px rgba(0, 150, 255, 0.3)", }}>A.I. features</b>.</Typography>
                </Stack>
            ) : (
                <Stack position="relative" width={"100%"} height={"100%"} overflow={"hidden"}>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{ width: "100%", borderRadius: "8px", objectFit: "cover", height: '100%' }}
                    />

                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 5,
                            right: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "white",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                        }}
                        onClick={handleRemoveImage}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            )}

            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
                name="builderImage"
            />
        </Stack>
    );
};

export default FileUpload;
