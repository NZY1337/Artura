/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import AIBuilder from "../../../Builder/AIBuilder";
import HistoryDrawer from "../../utils/drawer";

import { useMutation } from '@tanstack/react-query';
import { designGenerator } from "../../../../services/builder";

type ProjectImage = {
    id: string;
    url: string;
    projectId: string;
    createdAt: string;
};

type ProjectData = {
    result: {
        project?: {
            id: string;
            title: string;
            description: string;
            userId: string;
            category: string;
            createdAt: string;
            updatedAt: string;
        };
        image?: ProjectImage;
    }
};

export default function DesignGenerator() {
    const [data, setData] = useState<ProjectData | null>(null);
    const { isPending, mutate } = useMutation({
        mutationFn: designGenerator,
        onSuccess: (data: ProjectData) => {
            setData(data);
            // optionally show success toast, redirect, etc.
        },
        onError: (error) => {
            console.error("❌ Failed to create project:", error);
            // optionally show error toast
        }
    });


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>, stateBuilder: object) => {
        event.preventDefault();
        mutate(stateBuilder);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                    <Typography variant="body2" color="textSecondary">Design Generator uses advanced AI to help you instantly generate beautiful interior designs tailored to your style and space.
                        Whether you're starting with an empty room or looking to refresh your layout, our intelligent tool gives you custom design ideas in seconds — no design experience needed.
                    </Typography>
                </Grid>
            </Grid>

            <AIBuilder onSubmit={onSubmit} generatedPreview={data?.result.image?.url} isLoading={isPending} />
            <HistoryDrawer />
        </>
    );
}
