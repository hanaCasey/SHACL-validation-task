import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import DropZone from './DropZone';
import { useFileContext } from '../context/FileContext';


/**
 * FileUpload component allows users to upload RDF and Shape files.
 *
 * It includes two drop zones for file uploads and a submit button to validate the files.
 * The component interacts with the FileContext to manage file uploads and validation.
 *
 * @returns {JSX.Element} The rendered FileUpload component.
 */
function FileUpload() {
    const { handleRdfUpload, handleShapeUpload, validateFiles, rdfFile, shapeFile } = useFileContext();

    /**
     * Handles the accepted files for RDF upload.
     *
     * @param {File[]} acceptedFiles - The files that were accepted in the drop zone.
     */
    const handleRdf = (acceptedFiles) => {
        // console.log(acceptedFiles[0]);
        handleRdfUpload(acceptedFiles[0]);
    };

    /**
     * Handles the accepted files for Shape upload.
     *
     * @param {File[]} acceptedFiles - The files that were accepted in the drop zone.
     */
    const handleShape = (acceptedFiles) => {
        handleShapeUpload(acceptedFiles[0]);
    };

    /**
     * Handles the form submission to validate the uploaded files.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submit event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent reload because it's a form 
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
                gap: 2
            }}
        >
            <FormControl>
            <FormLabel sx={{ fontSize: '16px' }}>Content to validate</FormLabel>
                <DropZone
                    label={'RDF'}
                    onDrop={handleRdf}
                    acceptedFiles={{ 'text/turtle': ['.ttl'] }}
                />
            </FormControl>
            <FormControl>
            <FormLabel sx={{ fontSize: '16px' }}>External Shape</FormLabel>
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
                        fullWidth
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