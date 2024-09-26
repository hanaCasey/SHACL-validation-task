
import {Box } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';

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

