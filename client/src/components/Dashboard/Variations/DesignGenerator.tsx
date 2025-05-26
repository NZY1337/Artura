/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import AIBuilder from "../../Builder/AIBuilder";
import HistoryDrawer from "../History/History";

import { useMutation } from '@tanstack/react-query';
import { designGenerator } from "../../../services/builder";
import WaitingModal from "../../UtilityComponents/modals/WaitingModal";

import type { ProjectProps } from "../../../types";


export default function DesignGenerator() {
    const [openWaitingModal, setOpenWaitingModal] = useState<boolean>(false);
    const [data, setData] = useState<ProjectProps | null>(null);

    const { isPending, mutate } = useMutation({
        mutationFn: designGenerator,
        onSuccess: (data: ProjectProps) => {
            setData(data);
            setOpenWaitingModal(false);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const handleCloseWaitingModal = () => setOpenWaitingModal(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>, stateBuilder: object) => {
        event.preventDefault();
        mutate(stateBuilder);
        setOpenWaitingModal(true);
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
            <WaitingModal open={openWaitingModal} handleClose={handleCloseWaitingModal} />

        </>
    );
}
