from flask import Flask, jsonify, request
from pyshacl import validate
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, origins="*")

@app.route('/')
def hello_world():
    print('hello')
    return 'Hello World'

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
        # print(f'conforms: {conforms}')
        # print(f'results: {results_graph}')
        print(f'results_text: {results_text}')

        response_data = {'conforms': conforms, 
                    'results-text': results_text}

        return jsonify(response_data), 200

    except Exception as e:
        print(f"Couldn't upload file: {e}")
        d['status'] = 0
        return jsonify(d)  # Return error status


if __name__ == '__main__':  
    app.run(host='localhost', port=5000, debug=True)