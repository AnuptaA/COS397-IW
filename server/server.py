#!/usr/bin/env python

#-----------------------------------------------------------------------
# server.py
# Author: Anupta Argo
#-----------------------------------------------------------------------

from database_stuff
from flask import Flask, jsonify
from flask_cors import CORS

#-----------------------------------------------------------------------

PORT = 8080

#-----------------------------------------------------------------------

# app instance
app = Flask(__name__)
CORS(app)

@app.route('/api/home', methods=['GET'])
def return_info():
    return jsonify({
        'Question': "Question text lorem ipsum dolor",
        'Img': 'imgblob'
    })

#-----------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=PORT)