/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AIBuilder from "../../Builder/AIBuilder";
import HistoryDrawer from "../History/History";
import WaitingModal from "../../UtilityComponents/modals/WaitingModal";

// hooks
import { useState } from "react";
import useDesignGeneration from "../../../hooks/variations/useDesignGeneration";

import type { SubmitBuilderProps, ProjectResponseProps } from "../../../types";

export default function DesignGenerator() {
    const [openWaitingModal, setOpenWaitingModal] = useState<boolean>(false);

    const handleCloseWaitingModal = () => setOpenWaitingModal(false);
    const handleOpenWaitingModal = () => setOpenWaitingModal(true);

    const { isPending, mutate, data } = useDesignGeneration({
        closeWaitingModal: handleCloseWaitingModal
    });

    const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>, data: SubmitBuilderProps) => {
        event.preventDefault();
        mutate(data);
        handleOpenWaitingModal();
    };

    const generatedPreview = data?.result?.image?.url as ProjectResponseProps['result']['image']['url'];

    return (
        <>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                    <Typography variant="body2" color="textSecondary">Design Generator uses advanced AI to help you instantly generate beautiful interior designs tailored to your style and space.
                        Whether you're starting with an empty room or looking to refresh your layout, our intelligent tool gives you custom design ideas in seconds — no design experience needed.
                    </Typography>

                    <AIBuilder onHandleSubmit={onHandleSubmit} generatedPreview={generatedPreview} isLoading={isPending} />
                </Grid>

                <HistoryDrawer />
                <WaitingModal open={openWaitingModal} handleClose={handleCloseWaitingModal} />
            </Grid>

        </>
    );
}
