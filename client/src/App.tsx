import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './components/NotFound/NotFoundPage';
import Home from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';
import { CssBaseline } from '@mui/material';
import ProtectedRoute from './components/Protected/ProtectedRoute';

function App() {
    return (
        <Router>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<ProtectedRoute />}>
                    {/* <Route path="dashboard" element={<Navigate to="/dashboard" />} /> ✅ Redirect */}
                    <Route path="dashboard/*" element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    )
};

export default App;