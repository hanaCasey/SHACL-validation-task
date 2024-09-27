from flask import Flask, jsonify, request
from pyshacl import validate
from flask_cors import CORS, cross_origin
import re
import json

app = Flask(__name__)
CORS(app, origins="*")

@app.route('/api/validate', methods = ['POST', 'OPTIONS'])
@cross_origin()
def validate_ttl():
    """Validates the datagraph and responds to the frontend"""
    d = {}
    try:
        # Match the keys used in the frontend
        data_graph = request.files['dg']
        shape_graph = request.files['sg']
        print(f"Validating {data_graph.filename} for shape {shape_graph.filename}")
        dg = data_graph.read()
        sg = shape_graph.read()
        r = validate(dg,
            shacl_graph=sg,
            # ont_graph=og,
            inference='rdfs',
            abort_on_first=False,
            allow_infos=False,
            allow_warnings=False,
            meta_shacl=False,
            advanced=False,
            js=False,
            debug=False)
        
        conforms, results_graph, results_text = r

        parsed_data = parse_results_text(results_text)
        response_data = {'conforms': conforms, 
                    'parsed_data': parsed_data}

        return jsonify(response_data), 200

    except Exception as e:
        print(f"Couldn't upload file: {e}")
        d['status'] = 0
        return jsonify(d)  # Return error status


def parse_results_text(results_text):
    # Regex patterns to extract the necessary fields
    constraint_pattern = re.compile(r'Constraint Violation in ([^\(]+) \((http[^\)]+)\):')
    severity_pattern = re.compile(r'Severity: ([^\n]+)')
    source_shape_pattern = re.compile(r'Source Shape: \[([^\]]+)\]')
    focus_node_pattern = re.compile(r'Focus Node: ([^\n]+)')
    result_path_pattern = re.compile(r'Result Path: ([^\n]+)')
    value_node_pattern = re.compile(r'Value Node: ([^\n]+)')
    message_pattern = re.compile(r'Message: ([^\n]+)')

    # Split the response into individual constraint violations
    violations = results_text.split("Constraint Violation")

    # Store structured violations
    structured_violations = []

    for violation in violations[1:]:  # Skip the first "Validation Report" header
        # Extract data using regex
        constraint_match = constraint_pattern.search(violation)
        severity_match = severity_pattern.search(violation)
        source_shape_match = source_shape_pattern.search(violation)
        focus_node_match = focus_node_pattern.search(violation)
        result_path_match = result_path_pattern.search(violation)
        value_node_match = value_node_pattern.search(violation)  # Optional
        message_match = message_pattern.search(violation)

        structured_violation = {
            "component": constraint_match.group(1).strip() if constraint_match else None,
            "component_url": constraint_match.group(2).strip() if constraint_match else None,
            "severity": severity_match.group(1).strip() if severity_match else None,
            "source_shape": source_shape_match.group(1).strip() if source_shape_match else None,
            "focus_node": focus_node_match.group(1).strip() if focus_node_match else None,
            "result_path": result_path_match.group(1).strip() if result_path_match else None,
            "value_node": value_node_match.group(1).strip() if value_node_match else None,  # Optional
            "message": message_match.group(1).strip() if message_match else None
        }

        structured_violations.append(structured_violation)

    return structured_violations

if __name__ == '__main__':  
    app.run(host='localhost', port=5000, debug=True)