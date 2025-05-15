import { Box, Grid, Typography, Card, CardContent, Button, useTheme, Container, Divider } from '@mui/material';


const pricingPlans = [
    {
        title: 'Team',
        price: 'free',
        description: ['1 Project', 'AI Design Ideas for Free', 'Community Support', '1 Project', 'AI Design Ideas', 'Community Support'],
        highlighted: false,
    },
    {
        title: 'Agency',
        price: '$19/mo',
        description: ['Unlimited Projects', 'Priority AI Rendering when needed', 'Email Support 24/24', 'Unlimited Projects', 'Priority AI Rendering', 'Email Support', 'Priority AI Rendering',],
        highlighted: true,
    },
    {
        title: 'Enterprise',
        price: '$50/mo',
        description: ['Dedicated Support', 'White-labeling', 'Custom Models', 'Dedicated Support', 'White-labeling', 'Custom Models', 'Priority AI Rendering', 'Email Support'],
        highlighted: false,
    },
];

const PricingSection = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const theme = useTheme();

    return (
        <Container maxWidth={false} sx={{
            backgroundColor: '#e5e5f7',
            backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #212121 6px),repeating-linear-gradient(#212121, #000000)`,
            py: 2,
            position: 'relative'
        }}>
            <Container sx={{ my: 10, zIndex: 1, position: 'relative' }}>
                <Typography variant="h2" align="center" gutterBottom>
                    Our Pricing Plan
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" mb={6}>
                    Choose a plan that fits your design needs.
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {pricingPlans.map((plan) => (
                        <Grid size={{ xs: 12, md: 4 }} key={plan.title} gap={0}>
                            <Card
                                elevation={plan.highlighted ? 8 : 2}
                                sx={{
                                    // borderRadius: 4,
                                    padding: 0,
                                    // border: plan.highlighted ? `2px solid ${theme.palette.primary.main}` : '1px solid #ccc',
                                    // backgroundColor: plan.highlighted ? theme.palette.primary.light : 'background.paper',
                                    backgroundColor: '#121212',
                                    // color: plan.highlighted ? theme.palette.primary.contrastText : 'inherit',
                                    transition: '0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                <CardContent sx={{ padding: 0 }}>
                                    <Box p={4}>
                                        <Typography variant="body2" fontSize={20} fontWeight={200} gutterBottom align="center">
                                            {plan.title}
                                        </Typography>
                                        <Typography mb={4} variant="body1" color={'warning.main'} fontWeight={800} fontSize={30} align="center" gutterBottom>
                                            {plan.price}
                                        </Typography>

                                        <Box textAlign="center">
                                            <Button
                                                variant={plan.highlighted ? 'contained' : 'outlined'}
                                                color={plan.highlighted ? 'primary' : 'inherit'}
                                                sx={{
                                                    textTransform: 'none',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {plan.highlighted ? 'Get Started' : 'Learn More'}
                                            </Button>
                                        </Box>
                                    </Box>

                                    <Divider />

                                    <Box px={4} sx={{ mt: 3 }} >
                                        {plan.description.map((feature, idx) => (
                                            <Typography
                                                key={idx}
                                                variant="body2"
                                                align="center"
                                                sx={{ mb: 1 }}
                                                textAlign={'left'}
                                            >
                                                • {feature}
                                            </Typography>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container >
        </Container>
    );
};

export default PricingSection;
