import React from 'react';
import { FileProvider } from './FileContext';
import FileUpload from './FileUpload';
import FileResponse from './FileResponse';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '400px',
    },
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

function Validator() {
    return (
        <FileProvider>
            <FormContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography component="h1" variant="h4">
                        SHACL Validation
                    </Typography>
                    <Typography variant="caption">
                        This validator allows you to validate RDF content against SHACL shapes. The validator accepts only .ttl files, for now.
                    </Typography>
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
