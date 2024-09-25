import React from "react"; 
import Button from '@material-ui/core/Button';
import CloudUploadIcon from  '@material-ui/icons/CloudUpload';

export default function UploadButton() {
    return (
     <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
         Upload
       </Button>
    );
    }