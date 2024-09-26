import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const FileContext = createContext();

export const useFileContext = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
    const [rdfFile, setRdfFile] = useState(null);
    const [shapeFile, setShapeFile] = useState(null);
    const [validationResult, setValidationResult] = useState(null);
    const [validationMessage, setValidationMessage] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const backendURI = process.env.REACT_APP_BACKEND_URI;

    const handleRdfUpload = (rdf) => {
        setRdfFile(rdf);
    }
    const handleShapeUpload = (shape) => {
        setShapeFile(shape);
    };

    const validateFiles = async () => {

        if (!rdfFile || !shapeFile) {
            setError("Files missing. Please upload both RDF and Shape files.");
            return;
        }

        const formData = new FormData();
        formData.append('dg', rdfFile);
        formData.append('sg', shapeFile);
        setLoading(true);

        const startTime = Date.now();

        try {
            const response = await axios.post(`${backendURI}/api/validate`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setValidationResult(response.data);

        } catch (error) {
            console.error('Error during validation:', error);
            setError('Failed to validate. Please try again.');
        } finally {
            const endTime = Date.now(); // Capture the end time
            const delay = Math.max(1000 - (endTime - startTime), 0); // Ensure at least a 1 second delay

            setTimeout(() => {
                setLoading(false); // Stop loading after the delay
            }, delay);
        }
    }
    
    return (
        <FileContext.Provider value={{
            rdfFile, shapeFile, validationResult, loading, error,
            handleRdfUpload, handleShapeUpload, validateFiles
        }}>
            {children}
        </FileContext.Provider>
    );
};
