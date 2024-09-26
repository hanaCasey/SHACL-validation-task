import React from 'react';
import { FileProvider } from './FileContext';
import FileUpload from './FileUpload';
import FileResponse from './FileResponse';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';



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
}));

const FormContainer = styled(Stack)(({ theme }) => ({
    padding: 20,
    marginTop: '10vh',
}));

function Validator() {
    return (
        <FileProvider>
            <FormContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Box>
                        <FileUpload />
                    </Box>
                    <Box>
                        <FileResponse />
                    </Box>
                </Card>
            </FormContainer>
        </FileProvider>
    );
}

export default Validator;
