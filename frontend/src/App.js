import './App.css';
import React from "react";
import NavBar from './components/NavBar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import ReportDashboard from './components/ReportDashboard';
import Validator from './components/Validator';

const theme = createTheme({
  typography: {
    fontFamily: '"Helvetica", sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#71b8ce',
    },
    secondary: {
      main: '#d691a9',
    },
  },
});

/**
 * Main application component that wraps the routing and theming setup.
 *
 * The App component is the entry point of the application. It applies a 
 * Material-UI theme, sets up routing with React Router, and renders the 
 * navigation bar and routes for different pages, including the Validator
 * and ReportDashboard components.
 *
 * @returns {JSX.Element} The rendered App component with routing and theming.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ paddingTop: '64px' }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Validator />} />
            <Route path="/report" element={<ReportDashboard />} />
            <Route path="/about" element={<p>Hello about</p>} />
            <Route path="/help" element={<p>Hello Help</p>} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
