import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import DropZone from './DropZone';
import axios from 'axios'; 

const backendURI = process.env.REACT_APP_BACKEND_URI;



const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const FormContainer = styled(Stack)(({ theme }) => ({
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

function FileUpload() {

    const [rdfFile, setRDFFile] = useState(null);
    const [shapeFile, setShapeFile] = useState(null);

    const handleRDFUpload = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setRDFFile(acceptedFiles[0]); // Save RDF file
            console.log('RDF file uploaded:', acceptedFiles[0]);
        }
    };
    const handleShapeUpload = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setShapeFile(acceptedFiles[0]); // Save Shape file
            console.log('Shape file uploaded:', acceptedFiles[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(backendURI)

        if (!rdfFile || !shapeFile) {
            console.error("Please upload both RDF and Shape files.");
            return;
        }
        // Create FormData to send files
        const formData = new FormData();
        formData.append('rdf', rdfFile); 
        formData.append('shape', shapeFile);

        try {
            console.log('posting')
            const response = await axios.post(`${backendURI}/api/validate`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response from backend:', response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };


    return (
        <FormContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    SHACL Validation
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <Box>
                        <DropZone
                            label={'RDF'}
                            onDrop={handleRDFUpload}
                            acceptedFiles={{ 'text/turtle': ['.ttl'] }} />
                        <DropZone
                            label={'Shape'}
                            onDrop={handleShapeUpload}
                            acceptedFiles={{ 'text/turtle': ['.ttl'] }} />
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Validate
                    </Button>
                </Box>
            </Card>
        </FormContainer>

    );


}

export default FileUpload; 