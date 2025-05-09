import MuiCard from '@mui/material/Card';
import { Divider, Button, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`, // Soft white border
  '& a': {
    color: theme.palette.grey[400],

    'span': {
        textDecoration: 'underline',
        color: theme.palette.warning.main
    }
  }
}));

export default function CardModel({ children, variant, src }: { children: React.ReactNode, variant: 'elevation' | 'outlined', src: string }) {
  return (
  
    <Card variant={variant} elevation={2}>
        <Avatar 
            src={src}
            sx={{ 
                width: "100%", height: 200, mb: 1, 
                borderRadius: '5px'
            }} 
        />
        {children}
        <Divider sx={{ mt: 1 }}> <Button  sx={{ height:'50px'}} variant='text'>DiscoveR</Button></Divider>
    </Card>
  );
}
