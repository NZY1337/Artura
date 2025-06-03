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

    const asd = {
        "project": {
            "id": "6bee1c0c-e364-43fb-b7b4-d3da3b902936",
            "userId": "user_2xrVpetV8CkDDyfbJPSXmsrRe57",
            "prompt": "A warm Romanian living room featuring rustic wooden beams and carved furniture, traditional handwoven rugs with geometric patterns, and embroidered cushions. The walls are painted in soft cream with folk art decorations and framed rural landscapes. A wood-burning stove adds cozy warmth, and natural light streams through lace curtains on large windows. The space blends tradition and comfort with earthy tones and simple elegance.",
            "category": "DESIGN_GENERATION",
            "size": "1536x1024",
            "quality": "high",
            "createdAt": "2025-06-02T21:38:12.715Z",
            "updatedAt": "2025-06-02T21:38:12.715Z"
        },
        "images": {
            "count": 1
        },
        "imageGenerationResponse": {
            "id": "911495cd-21d0-4ae9-8705-f9d1226985f2",
            "projectId": "6bee1c0c-e364-43fb-b7b4-d3da3b902936",
            "background": "auto",
            "outputFormat": "png",
            "quality": "high",
            "size": "1536x1024",
            "inputTokens": 79,
            "imageTokens": 0,
            "textTokens": 79,
            "outputTokens": 6208,
            "totalTokens": 6287,
            "imageCost": 0.25,
            "tokenCost": 0.248715,
            "totalCost": 0.498715
        }
    }

    // const generatedPreview = data?.result?.image?.url as ProjectResponseProps['result']['image']['url'];
    // const generatedPreview = data?.result?.images?.[0]?.url as ProjectResponseProps['result']['images'][0]['url'];
    const generatedPreview = data?.result?.images?.[0]?.url as string;
    console.log("generatedPreview", data?.result);

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
