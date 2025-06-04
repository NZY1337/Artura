/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from "@mui/material/Grid";
import AIBuilder from "../../Builder/AIBuilder";
import HistoryDrawer from "../History/History";
import WaitingModal from "../../UtilityComponents/modals/WaitingModal";
import { useNotifications, } from '@toolpad/core/useNotifications';
import Box from "@mui/material/Box";

// hooks
import { useState } from "react";
import useDesignGeneration from "../../../hooks/variations/useDesignGeneration";

import type { SubmitBuilderProps, ProjectResponseProps } from "../../../types";
import { Container } from "@mui/material";

const Playground = () => {
    const [openWaitingModal, setOpenWaitingModal] = useState<boolean>(false);
    const [grid, setGrid] = useState(Array(24).fill(null));
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
            {grid.map(() => (
                <Box sx={{
                    aspectRatio: '1 / 1',
                    width: '100%',
                    boxSizing: 'border-box',
                    boxShadow: '0 0 0 1px #000',
                    display: 'flex',
                    placeContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    hello world
                </Box>
            ))}

            <Grid sx={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)' }} size={{ xs: 12, md: 12, lg: 12 }}>
                <AIBuilder onHandleSubmit={onHandleSubmit} generatedPreview={generatedPreview} isLoading={isPending} />
            </Grid>

            <HistoryDrawer />
            <WaitingModal open={openWaitingModal} handleClose={handleCloseWaitingModal} />

        </>
    );
}

export default Playground;