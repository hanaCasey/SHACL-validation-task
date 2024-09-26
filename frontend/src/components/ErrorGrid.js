
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

const rows = [
    {
        id: 1,
        // component: null,
        focus_node: 'ex:Bob',
        result_path: 'schema:email',
        severity: 'sh:Violation',
        source_shape: 'sh:datatype xsd:string ; sh:minCount Literal("1", datatype=xsd:integer) ; sh:path schema:email ; sh:pattern Literal("^\\S+@\\S+\\.\\S+$") ; skos:definition Literal("The email address of the person. Must be a valid email format and is mandatory.") ; skos:label Literal("Email")',
        value_node: null,
        message: 'Less than 1 values on ex:Bob->schema:email'
    },
    {
        id: 2,
        // component: null,
        focus_node: 'ex:Bob',
        result_path: 'schema:telephone',
        severity: 'sh:Violation',
        source_shape: 'sh:datatype xsd:string ; sh:path schema:telephone ; sh:pattern Literal("^\\+\\d{9,15}$") ; skos:definition Literal("The telephone number of the person in international format.") ; skos:label Literal("Telephone")',
        value_node: 'Literal("1234567890")',
        message: 'Value does not match pattern \'^\\+\\d{9,15}$\''
    },
    {
        id: 3,
        // component: null,
        focus_node: 'ex:Bob',
        result_path: 'schema:birthDate',
        severity: 'sh:Violation',
        source_shape: 'sh:datatype xsd:date ; sh:path schema:birthDate ; skos:definition Literal("The birth date of the person in ISO 8601 format (YYYY-MM-DD).") ; skos:label Literal("Birth Date")',
        value_node: 'Literal("14-06-1985")',
        message: 'Value is not Literal with datatype xsd:date'
    }
];



function ErrorGrid() {
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

