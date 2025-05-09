/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function DesignGenerator() {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                <Typography variant="body2" color="textSecondary">Design Generator uses advanced AI to help you instantly generate beautiful interior designs tailored to your style and space.
                    Whether you're starting with an empty room or looking to refresh your layout, our intelligent tool gives you custom design ideas in seconds — no design experience needed.
                </Typography>
            </Grid>
        </Grid>
    );
}
