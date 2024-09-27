
import {Box } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';


/**
 * ErrorGrid Component
 *
 * A component that displays validation errors in a structured grid format using Material-UI's DataGrid.
 * The grid includes columns for focus node, result path, severity, source shape, value node, and message.
 *
 * @component
 * @example
 * const errors = [
 *   { focus_node: 'Node1', result_path: '/path/to/node1', severity: 'Error', source_shape: 'Shape1', value_node: 'Value1', message: 'An error occurred' },
 *   // more error objects...
 * ];
 *
 * return (
 *   <ErrorGrid data={errors} />
 * );
 *
 * @param {Object[]} props.data - An array of error objects to display in the grid.
 * @param {string} props.data[].focus_node - The focus node associated with the error.
 * @param {string} props.data[].result_path - The result path where the error occurred.
 * @param {string} props.data[].severity - The severity level of the error (e.g., Warning, Error).
 * @param {string} props.data[].source_shape - The shape source related to the error.
 * @param {string} props.data[].value_node - The value node where the error was identified.
 * @param {string} props.data[].message - A message describing the error.
 *
 * @returns {JSX.Element} The rendered ErrorGrid component.
 */

const columns = [
    // { field: 'component', headerName: 'Component', width: 150 },
    { field: 'focus_node', headerName: 'Focus Node', width: 150 },
    { field: 'result_path', headerName: 'Result Path', width: 150 },
    { field: 'severity', headerName: 'Severity', width: 150 },
    { field: 'source_shape', headerName: 'Source Shape', width: 300 },
    { field: 'value_node', headerName: 'Value Node', width: 150 },
    { field: 'message', headerName: 'Message', width: 300 },
];
const ErrorGrid = ({ data }) => {

    
    const rows = data.map((item, index) => ({
        id: index + 1, // Assigning an ID based on the index
        focus_node: item.focus_node || null,
        result_path: item.result_path || null,
        severity: item.severity || null,
        source_shape: item.source_shape || null,
        value_node: item.value_node || null,
        message: item.message || null,
    }));

    return (
        <Box sx={{ height: 400, width: '100%', overflow: 'auto' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                sortable={true}
                pagination={true}
            />
        </Box>
    );
}

export default ErrorGrid;

