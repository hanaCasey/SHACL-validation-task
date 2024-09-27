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
    fontFamily: '"Helvetica", sans-serif',  // Replace this with your desired font
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
}
);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ paddingTop: '64px' }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Validator />} />
            <Route path="/report" element={<ReportDashboard />} />
            <Route path="/about" element={<p>
                Hello about
              </p>} />
            <Route path="/help" element={
              <p>
                Hello Help
              </p>} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
