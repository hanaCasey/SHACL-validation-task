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
    """Handles the upload of a file."""
    print('hi')
    d = {}
    try:
        # Match the keys used in the frontend
        rdf_file = request.files['rdf']
        shape_file = request.files['shape']
        print(f"Uploading file {rdf_file.filename}")
        print(f"Uploading file {shape_file.filename}")
        d['status'] = 1
        return jsonify(d)  # Return success status

    except Exception as e:
        print(f"Couldn't upload file: {e}")
        d['status'] = 0
        return jsonify(d)  # Return error status


if __name__ == '__main__':  
    app.run(host='localhost', port=5000, debug=True)