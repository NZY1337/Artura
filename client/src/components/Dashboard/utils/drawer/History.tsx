import { Grid, Card, CardMedia } from '@mui/material';

const pexelsImages = [
    'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?w=400&h=300&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=400&h=300&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?w=400&h=300&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?w=400&h=300&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/6585767/pexels-photo-6585767.jpeg?w=400&h=300&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?w=400&h=300&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?w=400&h=300&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?w=400&h=300&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?w=400&h=300&auto=compress&cs=tinysrgb'
];

const PexelsGallery = () => {
    return (
        <Grid container spacing={2} p={1}>
            {pexelsImages.map((url, index) => (
                <Grid size={{ xs: 6, md: 6, lg: 6, xl: 4 }} key={index}>
                    <Card
                        onClick={() => alert(`Image ${index + 1} clicked`)}
                        sx={{
                            borderRadius: '10px',
                            boxShadow: 3,
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="100"
                            image={url}
                            alt={`Pexels image ${index + 1}`}
                            sx={{
                                objectFit: 'cover',
                                transition: 'transform 0.15s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.15s ease-in-out',
                                    cursor: 'pointer',
                                }
                            }}

                        />
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default PexelsGallery;
