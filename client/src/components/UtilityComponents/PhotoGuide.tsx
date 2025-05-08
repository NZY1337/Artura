import {
  Grid2 as Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { goodPhotosData, badPhotosData } from "../../helpers/constants";



const PhotoGuidelines = () => {
  return (
        <Grid container spacing={4}>
          {/* Left Column - Bad Photos */}
          <Grid  size={{xs:12, sm: 6}}>
            <Typography  sx={{ mb: 2 }}>
              Bad photos:
            </Typography>
            <Grid container spacing={2}>
              {badPhotosData.map((item, index) => (
                <Grid size={{xs:12, sm: 6}} key={index}>
                  <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      image={item.src}
                      alt={item.label}
                    />
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <CancelIcon sx={{ color: "red", mr: 1 }} />
                      <Typography variant="subtitle1">{item.label}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Column - Good Photos */}
          <Grid size={{xs:12, sm: 6}}>
            <Typography  sx={{ mb: 2 }}>
              Good photos:
            </Typography>
            <Grid container spacing={2}>
              {goodPhotosData.map((item, index) => (
                <Grid  size={{ xs:12, sm: 6}} key={index}>
                  <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      image={item.src}
                      alt={item.label}
                    />
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
                      <Typography variant="subtitle1">{item.label}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
  );
};

export default PhotoGuidelines;
