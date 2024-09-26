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
            <Stack spacing={2}>
                <Typography variant="h6">Content to validate</Typography>
                <DropZone
                    label={'RDF'}
                    onDrop={handleRdf}
                    acceptedFiles={{ 'text/turtle': ['.ttl'] }}
                />
                <Typography variant="h6">External Shape</Typography>
                <DropZone
                    label={'Shape'}
                    onDrop={handleShape}
                    acceptedFiles={{ 'text/turtle': ['.ttl'] }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!rdfFile || !shapeFile}
                    >
                        Validate
                    </Button>
                </Box>
            </Stack>

        </Box>
    );
}

export default FileUpload; 