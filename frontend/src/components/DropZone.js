import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import Dropzone from 'react-dropzone'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';


function DropZone({ label, onDrop, acceptedFiles}) {

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
        border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.grey[500]}`,
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
                        isDragActive={isDragActive}
                        sx={{
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.action.hover,
                            },
                        }}
                    >
                        <input {...getInputProps()} />
                        {!isUploaded && (
                            <CloudUploadIcon
                                sx={{
                                    fontSize: 50,
                                    mb: 2,
                                    color: isDragActive ? theme.palette.primary.main : theme.palette.grey[500],
                                }}
                            />
                        )}
                        <Typography variant="body1" color="textSecondary">
                            {isDragActive
                                ? 'Drop the files here...'
                                : fileName
                                    ? `Uploaded file: ${fileName}`
                                    : `Drag and drop ${label} file here, or click to select files`}
                        </Typography>
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