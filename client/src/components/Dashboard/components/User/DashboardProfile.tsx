/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid  } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CardModel from "../../../UtilityComponents/Card";
import { CustomCard } from "../../../UtilityComponents/CustomCard";

export default function DashboardProfile() {
  return (
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <CardModel src={"https://images.pexels.com/photos/5292244/pexels-photo-5292244.jpeg" } variant="elevation">
                <Stack>
                    <Typography variant="body2" mb={1} fontSize={25} color="textSecondary">Design Generator</Typography>
                    <Typography variant="body2" color="textSecondary">Design Generator uses advanced AI to help you instantly generate beautiful interior designs tailored to your style and space. 
                        Whether you're starting with an empty room or looking to refresh your layout, our intelligent tool gives you custom design ideas in seconds — no design experience needed.
                    </Typography>
                </Stack>
            </CardModel>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <CardModel src={"https://images.pexels.com/photos/12089403/pexels-photo-12089403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} variant="elevation">
                <Stack>
                    <Typography variant="body2" mb={1} fontSize={25} color="textSecondary">Virtual Staging</Typography>
                    <Typography variant="body2" color="textSecondary">Virtual staging is the process of using advanced digital tools to furnish and decorate empty or outdated spaces—all 
                        through software. Whether you're staging a home for sale or previewing an interior design, virtual staging allows you to visualize stylish, 
                        fully furnished rooms without moving a single piece of furniture.
                    </Typography>
                </Stack>
            </CardModel>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <CardModel src={"https://images.pexels.com/photos/158148/ruhl-house-home-galveston-texas-158148.jpeg"} variant="elevation">
                <Stack>
                    <Typography variant="body2" mb={1} fontSize={25} color="textSecondary">Landscaping</Typography>
                    <Typography variant="body2" color="textSecondary">Virtual landscaping uses cutting-edge digital tools to visualize beautiful gardens, 
                        patios, and outdoor areas before any physical work begins. Whether you're updating a backyard or 
                        planning a full exterior transformation, virtual landscaping lets you preview designs, materials, and layouts with ease.
                    </Typography>
                </Stack>
            </CardModel>
        </Grid>
      </Grid>
  );
}
