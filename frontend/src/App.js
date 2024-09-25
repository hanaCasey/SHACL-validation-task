import './App.css';
import React from "react";
import NavBar from './components/NavBar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload'; 
import { Box } from '@mui/material';


const theme = createTheme({
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
      <Box sx={{ paddingTop: '64px'}}>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={
            <FileUpload/>} />
          <Route path="/about" element={
            <p>
            Hello About
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
