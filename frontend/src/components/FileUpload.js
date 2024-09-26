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
import { useNavigate } from 'react-router-dom';
import { useFileContext } from './FileContext';


function FileUpload() {

    const { handleRdfUpload, handleShapeUpload, validateFiles, rdfFile, shapeFile } = useFileContext();

    const handleRdf = (acceptedFiles) => {
        console.log(acceptedFiles[0])
        handleRdfUpload(acceptedFiles[0]);
    };

    const handleShape = (acceptedFiles) => {
        handleShapeUpload(acceptedFiles[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); //prevent reload because it's a form 
        await validateFiles(); 
    };

    return (
        <Box>
            <Typography component="h1" variant="h4">
                SHACL Validation
            </Typography>
            <Stack spacing={2}>
                <DropZone
                    label={'RDF'}
                    onDrop={handleRdf}
                    acceptedFiles={{ 'text/turtle': ['.ttl'] }}
                />
                <DropZone
                    label={'Shape'}
                    onDrop={handleShape}
                    acceptedFiles={{ 'text/turtle': ['.ttl'] }}
                />
                <Button type="submit" variant="contained"
                    onClick={handleSubmit}
                    disabled={!rdfFile || !shapeFile}>
                    Validate
                </Button>
            </Stack>
        </Box>
    );
}

export default FileUpload; 