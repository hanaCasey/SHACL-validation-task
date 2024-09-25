import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from '@mui/material';
import axios from 'axios';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';


const backendURI = process.env.REACT_APP_BACKEND_URI;
const bufferTime = 1000;

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '700px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const ResponseContainer = styled(Stack)(({ theme }) => ({
    padding: 20,
    marginTop: '10vh',
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

function ResponseZone() {

    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true); // load for a nice user experience
    const [validationResult, setValidationResult] = useState(null);
    const [error, setError] = useState(null);

    const { rdfFile, shapeFile } = location.state || {};

    // Validate files async
    useEffect(() => {
        const validateFiles = async () => {
            const startTime = Date.now();

            if (!rdfFile || !shapeFile) {
                setError("Files missing. Please upload both RDF and Shape files.");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('dg', rdfFile);
            formData.append('sg', shapeFile);

            try {
                const response = await axios.post(`${backendURI}/api/validate`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setValidationResult(response.data); // save validation report

            } catch (error) {
                console.error('Error during validation:', error);
                setError('Failed to validate. Please try again.');
            } finally {

                const endTime = Date.now();
                const delay = Math.max(bufferTime - (endTime - startTime), 0); // minimum delay of 1 second
                setTimeout(() => {
                    setLoading(false); // Stop loading after response
                }, delay);

            }
        };

        setLoading(true); // Buffer for one second
        validateFiles(); // call backend
    }, [rdfFile, shapeFile]);

    const handleBack = () => {
        navigate(-1); // Navigate back to the file upload page
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Button variant="outlined" onClick={handleBack} sx={{ marginBottom: 2 }}>
                Back
            </Button>
            <ResponseContainer>
                {loading ? (
                    // Card for displaying the loading spinner
                    <Card>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                        >
                            Validating files...
                        </Typography>
                        <CircularProgress />
                    </Card>
                ) : error ? (
                    <Card>
                    // Error handling
                        <Typography component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                        >{error}</Typography>
                    </Card>
                ) : (
                    // Card for displaying the response table
                    <Card>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                        >
                            Validation Results
                        </Typography>

                        {/* Table to display validation results
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Field</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(validationResult).map((key) => (
                                        <TableRow key={key}>
                                            <TableCell>{key}</TableCell>
                                            <TableCell>{JSON.stringify(validationResult[key])}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> */}
                    </Card>
                )}

            </ResponseContainer>
        </Box>
    );

}



export default ResponseZone; 