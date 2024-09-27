import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dropzone from 'react-dropzone'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';


/**
 * DropZone Component
 *
 * A customizable drag-and-drop file upload component that allows users to upload files by dragging them into the area or clicking to select files.
 *
 * @component
 * @example
 * return (
 *   <DropZone 
 *     label="RDF File" 
 *     onDrop={handleFileUpload} 
 *     acceptedFiles={{ 'text/turtle': ['.ttl'] }} 
 *   />
 * )
 *
 * @param {Object} props - Component props
 * @param {string} props.label - The label for the DropZone, displayed below the upload area.
 * @param {function} props.onDrop - Callback function triggered when a file is dropped. Receives the accepted files as an argument.
 * @param {Object} props.acceptedFiles - An object defining accepted file types for the dropzone, following the react-dropzone format.
 *
 * @returns {JSX.Element} The rendered DropZone component.
 */

function DropZone({ label, onDrop, acceptedFiles }) {

    const theme = useTheme();
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFileName(acceptedFiles[0].name);
            setIsUploaded(true);
            onDrop(acceptedFiles);
        }
    };

    const StyledDropzone = styled(Box)(({ theme, isDragActive }) => ({
        border: `1px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.grey[500]}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        backgroundColor: isUploaded
            ? theme.palette.background.default // Change color when uploaded
            : isDragActive
                ? theme.palette.action.hover
                : theme.palette.background.default,
    }));

    return (
        <Box>
            {/* <Typography variant="h5" gutterBottom>
                Upload RDF File
            </Typography> */}
            <Dropzone onDrop={handleDrop} accept={acceptedFiles} multiple={false}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <StyledDropzone
                        {...getRootProps()}
                        sx={{
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.action.hover,
                            },
                        }}
                    >
                        <input {...getInputProps()} />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1, // Space between the icon and text
                            }}
                        >

                            {!isUploaded && (
                                <CloudUploadIcon
                                    sx={{
                                        fontSize: 20,
                                        // mb: 2,
                                        color: isDragActive ? theme.palette.primary.main : theme.palette.grey[500],
                                    }}
                                />
                            )}
                            <Typography variant="caption" color="textSecondary">
                                {isDragActive
                                    ? 'Drop the file here...'
                                    : fileName
                                        ? `File: ${fileName}`
                                        : `Drag and drop or click to select files`}
                            </Typography>
                            </Box>
                    </StyledDropzone>
                )}
            </Dropzone>
            <Typography variant="caption" color="textSecondary" mt={2}>
                Upload {label}
            </Typography>
        </Box>


    );



}

export default DropZone;