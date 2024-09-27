import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import DropZone from './DropZone';
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
        <Box
            component="form"

            noValidate
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
            }}
        >
            <FormControl>
            <FormLabel htmlFor="email">Content to validate</FormLabel>
                <DropZone
                    label={'RDF'}
                    onDrop={handleRdf}
                    acceptedFiles={{ 'text/turtle': ['.ttl'] }}
                />
            </FormControl>
            <FormControl>
            <FormLabel htmlFor="email">External Shape</FormLabel>
                <DropZone
                    label={'Shape'}
                    onDrop={handleShape}
                    acceptedFiles={{ 'text/turtle': ['.ttl'] }}
                />
            </FormControl>
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
            

        </Box>
    );
}

export default FileUpload; 