/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid  } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function DashboardProfile() {
  return (
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={1} sx={{ borderRadius: 2, maxWidth: '100%' }}>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                    {/* <Avatar src={profileImage} alt="User Avatar" sx={{ width: 100, height: 100 }} /> */}
                    <Stack>
                        {/* <Typography variant="h5">{user?.fullName}</Typography> */}
                        <Typography variant="body2" color="textSecondary">Los Angeles, USA</Typography>
                        <Typography variant="body2" color="textSecondary">GTM-7</Typography>
                    </Stack>
                    </Stack>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button fullWidth variant="contained" component="label" startIcon={<UploadFileIcon />}> 
                        Upload Image
                        {/* <input type="file" hidden accept="image/*" onChange={onHandleImage} /> */}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
      </Grid>
  );
}
