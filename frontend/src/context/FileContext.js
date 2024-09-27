import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

/**
 * FileContext provides a way to share state and functions related to file uploads and validation
 * across components without prop drilling.
 *
 * @typedef {Object} FileContextType
 * @property {File|null} rdfFile - The uploaded RDF file.
 * @property {File|null} shapeFile - The uploaded Shape file.
 * @property {Object|null} validationResult - The result of the validation after files are processed.
 * @property {boolean} loading - Indicates whether the validation process is ongoing.
 * @property {string|null} error - An error message if validation fails.
 * @property {Function} handleRdfUpload - Function to set the RDF file state.
 * @property {Function} handleShapeUpload - Function to set the Shape file state.
 * @property {Function} validateFiles - Function to validate the uploaded files against the backend.
 */

/**
 * Context for managing file uploads and validation.
 * @type {React.Context<FileContextType>}
 */
const FileContext = createContext();

/**
 * Custom hook to use the FileContext.
 *
 * @returns {FileContextType} The current context value.
 */
export const useFileContext = () => useContext(FileContext);

/**
 * FileProvider component to encapsulate children with file management logic.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to wrap with the provider.
 * @returns {JSX.Element} The FileProvider component.
 */

export const FileProvider = ({ children }) => {
    const [rdfFile, setRdfFile] = useState(null);
    const [shapeFile, setShapeFile] = useState(null);
    const [validationResult, setValidationResult] = useState(null);
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
