import Grid from '@mui/material/Grid2';
import ErrorGrid from './ErrorGrid';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button
} from '@mui/material';


function ReportDashboard() {

    const location = useLocation();
    const { validationResult } = location.state || {}; 
    const navigate = useNavigate();

    const data = validationResult?.parsed_data || [];

    const handleBack = () => {
        navigate(-1); // Navigate back to the file upload page
    };

    return (
        <Container maxWidth='xl' sx={{ padding: 2 }}>
            <Button variant="outlined" onClick={handleBack} sx={{ marginBottom: 2 }}>
                Back
            </Button>
            <Grid
                container
                spacing={2}
                columns={12}
                // padding={5}
                sx={{ mb: (theme) => theme.spacing(2), padding: (theme) => theme.spacing(5) }}
            >
                <Grid item size={{xs:12, md:8}}>
                    <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                        Errors
                    </Typography>
                    <ErrorGrid data={data} />
                </Grid>
                <Grid item size={{xs:12, md:4}}>
                    <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                        RDF Viz
                    </Typography>
                </Grid>
            </Grid>

            {/* </Box> */}

            {/* SideMenu */}
            {/* Back Button

            Error list scrollable 

            menu of how to group the errors

            Viz of the data to the right (screenshot for now) */}


        </Container>
    );
}


export default ReportDashboard; 