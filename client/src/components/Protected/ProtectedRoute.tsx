import { Navigate, Outlet, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useUser, useClerk } from '@clerk/clerk-react';


const ProtectedRoute = () => {
  const { isSignedIn } = useUser();
  const location = useLocation();

  console.log(isSignedIn);

  if (!isSignedIn) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={200} />
      </Box>
    );
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />;
  
};

export default ProtectedRoute;
