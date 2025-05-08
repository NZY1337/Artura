import LinearProgress from '@mui/material/LinearProgress';
import Button, {  ButtonProps } from "@mui/material/Button";
import Box from "@mui/material/Box";

interface LoadingButtonProps extends ButtonProps{
    loading: boolean;
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

const LoadingButton = ({ loading, text, disabled, onClick, ...props }: LoadingButtonProps) => {
    return (
        <Box>
            <Button disabled={disabled} onClick={onClick} fullWidth {...props}>
                {loading ? "Loading..." : text} 
            </Button>
            {loading && <LinearProgress sx={{ bottom: '4px', borderRadius: '4px', zIndex: "-1" }} />}
        </Box>
    );
};

export default LoadingButton