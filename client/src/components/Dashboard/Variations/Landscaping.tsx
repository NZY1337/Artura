/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import HistoryDrawer from "../History/History";

export default function Landscaping() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                    <Typography variant="body2" color="textSecondary">Design Generator uses advanced AI to help you instantly generate beautiful interior designs tailored to your style and space.
                        Virtual landscaping uses cutting-edge digital tools to visualize beautiful gardens, patios, and outdoor areas before any physical work begins. Whether you're updating a
                        backyard or planning a full exterior transformation, virtual landscaping lets you preview designs, materials, and layouts with ease..
                    </Typography>
                </Grid>
            </Grid>
            <HistoryDrawer />
        </>
    );
}
