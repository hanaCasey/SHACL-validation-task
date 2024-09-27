import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFileContext } from '../context/FileContext';


/**
 * Styled container for the response.
 * @type {React.ComponentType}
 */
const ResponseContainer = styled(Stack)(({ theme }) => ({
    padding: 20,
}));

/**
 * FileResponse component displays the validation result of uploaded files.
 *
 * This component shows a loading indicator while the validation is in progress,
 * a success message if validation passes, and a failure message with a button
 * to see the report if validation fails.
 *
 * @returns {JSX.Element} The rendered component.
 */
function FileResponse() {
    const { validationResult, loading } = useFileContext();
    const navigate = useNavigate();

    /**
     * Handles the click event to navigate to the report page with the validation result.
     */
    const handleReport = () => {
        navigate('/report', { state: { validationResult } });
    };

    return (
        <ResponseContainer>
            {loading && <CircularProgress sx={{ margin: '20px auto' }} />}
            {!loading && validationResult !== null  && validationResult.conforms && (
                <Box sx={{ textAlign: 'center', margin: '20px auto' }}>
                <CheckCircleIcon color="success" fontSize="large" sx={{ margin: '20px auto' }} />
                <Typography variant="body1" sx={{ mb: 2 }}>Validation success!</Typography>
                </Box>
            )}
            {!loading && validationResult !== null  && !validationResult.conforms && (
                <Box sx={{ textAlign: 'center', margin: '20px auto' }}>
                    <CancelIcon color="error" fontSize="large" sx={{ mb: 2 }}/>
                    <Typography variant="body1" sx={{ mb: 2 }}>Validation failed!</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="outlined" onClick={handleReport}>
                            See Report
                        </Button>
                    </Box>
                </Box>
            )}

        </ResponseContainer>
    );

}

export default FileResponse; 