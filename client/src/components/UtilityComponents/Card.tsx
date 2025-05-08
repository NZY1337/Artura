import MuiCard from '@mui/material/Card';
import { Divider, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  '& a': {
    color: theme.palette.grey[400],

    'span': {
        textDecoration: 'underline',
        color: theme.palette.warning.main
    }
  }
}));

export default function CardModel({ children, variant }: { children: React.ReactNode, variant: 'elevation' | 'outlined' }) {

  return (
  
    <Card variant={variant}>
        {children}
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button fullWidth variant="outlined" onClick={() => alert('Sign in with Google')} startIcon={<GoogleIcon />}>
                Sign in with Google
            </Button>
        </Box>
    </Card>
  );
}
