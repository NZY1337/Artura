import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import HistoryDrawer from "../History/History";

export default function VirtualStaging() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                    <Typography variant="body2" color="textSecondary">Design Generator uses advanced AI to help you instantly generate beautiful interior designs tailored to your style and space.
                        Whether you're starting with an empty room or looking to refresh your layout, our intelligent tool gives you custom design ideas in seconds — no design experience needed.
                    </Typography>
                </Grid>
            </Grid>

            <HistoryDrawer />
        </>
    );
}
