import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((ctx) =>
    createStyles({
        hiUser: {
            '& .MuiTypography-root.MuiLink-root': {
                color: 'orange',
                fontWeight: 'bold',

                '&:hover': {   
                    color: 'orange',
                    opacity: '.8'
                },
            }
        }
        
    })
);

export default useStyles;