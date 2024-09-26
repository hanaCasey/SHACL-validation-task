import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFileContext } from './FileContext';


const ResponseContainer = styled(Stack)(({ theme }) => ({
    // padding: 20,
    // marginTop: '10vh',
}));


function FileResponse() {

    const { validationResult, loading, error } = useFileContext();
    const navigate = useNavigate();

    const handleReport = () => {
        navigate('/report', { state: { validationResult } })
    };
 

    return (
        <ResponseContainer>
            {loading && <CircularProgress sx={{ margin: '20px auto' }} />}
            {!loading && validationResult !== null  && validationResult.conforms === true && (
                <CheckCircleIcon color="success" fontSize="large" sx={{ margin: '20px auto' }} />
            )}
            {!loading && validationResult !== null  && validationResult.conforms === false && (
                <Box sx={{ textAlign: 'center', margin: '20px auto' }}>
                    <CancelIcon color="error" fontSize="large" />
                    <Typography variant="body1">Validation failed!</Typography>
                    <Button variant="outlined" onClick={handleReport}>
                        See Report
                    </Button>
                </Box>
            )}

        </ResponseContainer>
    );

}

export default FileResponse; 