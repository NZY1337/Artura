import React, { useRef } from "react";
import { Stack, IconButton } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotifications } from '@toolpad/core/useNotifications';

// types
import type { FileUploadProps } from "../../types";


const FileUpload = ({ builderState, setBuilderState }: FileUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const notifications = useNotifications();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const files = event.target.files;

        if (files && files.length > 0) {
            const images: string[] = [];

            Array.from(files).forEach(file => {
                if (["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
                    images.push(URL.createObjectURL(file));
                } else {
                    notifications.show('Only PNG, JPEG, and JPG files are allowed!', {
                        severity: 'error',
                        autoHideDuration: 3000,
                    });
                }
            });

            setBuilderState((prev: typeof builderState) => ({ ...prev, images }));
        }

    };

    // const handleRemoveImage = () => {
    //     setPreview(null);
    //     if (fileInputRef.current) {
    //         fileInputRef.current.value = ""; // Reset file input
    //     }
    // };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Stack spacing={2} alignItems="center">
            <IconButton onClick={handleClick}>
                <UploadFileIcon />
            </IconButton >

            <input
                type="file"
                multiple
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
