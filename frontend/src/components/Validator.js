import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FileUpload from './FileUpload';
import ResponseZone from './ReponseZone';
import { Container } from '@mui/material';


function Validator() {

    return (
        <Container>
            <Box><FileUpload /></Box>
            <Box><ResponseZone /></Box>
        </Container>
    );
}

export default Validator; 