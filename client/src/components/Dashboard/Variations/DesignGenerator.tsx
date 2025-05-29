/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from "@mui/material/Grid";
import AIBuilder from "../../Builder/AIBuilder";
import HistoryDrawer from "../History/History";
import WaitingModal from "../../UtilityComponents/modals/WaitingModal";
import { useNotifications, } from '@toolpad/core/useNotifications';

// hooks
import { useState } from "react";
import useDesignGeneration from "../../../hooks/variations/useDesignGeneration";

import type { SubmitBuilderProps, ProjectResponseProps } from "../../../types";

export default function DesignGenerator() {
    const [openWaitingModal, setOpenWaitingModal] = useState<boolean>(false);
    const notifications = useNotifications();

    const handleCloseWaitingModal = () => setOpenWaitingModal(false);
    const handleOpenWaitingModal = () => setOpenWaitingModal(true);

    const { isPending, mutate, data } = useDesignGeneration({
        closeWaitingModal: handleCloseWaitingModal
    });

    const onHandleSubmit = async (data: SubmitBuilderProps) => {
        if (data.prompt === '') {
            notifications.show('Add more details to the prompt for better results.  ', {
                severity: 'error',
                autoHideDuration: 3000,
            })
            return;
        }
        mutate(data);
        handleOpenWaitingModal();
    };

    const generatedPreview = data?.result?.image?.url as ProjectResponseProps['result']['image']['url'];

    return (
        <>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                    <AIBuilder onHandleSubmit={onHandleSubmit} generatedPreview={generatedPreview} isLoading={isPending} />
                </Grid>

                <HistoryDrawer />
                <WaitingModal open={openWaitingModal} handleClose={handleCloseWaitingModal} />
            </Grid>

        </>
    );
}
