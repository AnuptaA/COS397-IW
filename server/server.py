#!/usr/bin/env python

#-----------------------------------------------------------------------
# server.py
# Author: Anupta Argo & Jeremy Michoma
#-----------------------------------------------------------------------

import base64
import flask
from flask_cors import CORS
import retrieval
import validation

#-----------------------------------------------------------------------

PORT = 8080

#-----------------------------------------------------------------------

# app instance
app = flask.Flask(__name__)
CORS(app)

#-----------------------------------------------------------------------

# Homepage route
@app.route('/', methods=['GET'])
def index():
    questions = []

    for i in range(1, 28):
        question = retrieval.get_question(i)
        questions.append(question)

    return flask.jsonify(questions)

#-----------------------------------------------------------------------

# Traversal solutions route
@app.route('/solutions/traversals', methods=['GET'])
def traversals_solutions():

    quest_id = flask.request.args.get('quest_id')
    quest_details = retrieval.get_question(quest_id)

    return flask.jsonify(quest_details)

#-----------------------------------------------------------------------

# True/False solutions route
@app.route('/solutions/truefalse', methods=['GET'])
def truefalse_solutions():

    quest_id = flask.request.args.get('quest_id')
    quest_details = retrieval.get_tf_solution(int(quest_id))

    return flask.jsonify(quest_details)

#-----------------------------------------------------------------------

# Traversal questions route
@app.route('/traversals', methods=['GET', 'POST'])
def traversals():
    if flask.request.method == 'GET':
        quest_id = flask.request.args.get('quest_id')
        if quest_id:
            quest_details = retrieval.get_question(quest_id)
            return flask.jsonify(quest_details)
        else:
            return flask.jsonify({'error': 'Question ID is required'}), 400

    if flask.request.method == 'POST':
        data = flask.request.get_json()
        quest_id = flask.request.args.get('quest_id')
        if quest_id:
            quest_details = retrieval.get_question(quest_id)
            is_valid = validation.handle_traversals_ans(data['answer'], quest_details['solution'])
            prompt_str = retrieval.get_traversal_prompt_str(quest_details, data)
            return flask.jsonify({'isValid': is_valid, 'promptStr': prompt_str})
        else:
            return flask.jsonify({'error': 'quest_id is required'}), 400

#-----------------------------------------------------------------------
    
# True/False questions route
@app.route('/truefalse', methods=['GET', 'POST'])
def truefalse():
    if flask.request.method == 'GET':
        quest_id = flask.request.args.get('quest_id')
        if quest_id:
            quest_details = retrieval.get_tf_question(int(quest_id))
            return flask.jsonify(quest_details)
        else:
            return flask.jsonify({'error': 'Question ID is required'}), 400
    
    if flask.request.method == 'POST':
        data = flask.request.get_json()
        quest_id = flask.request.args.get('quest_id')
        if quest_id:
            correct_arr = retrieval.get_tf_ans_arr(int(quest_id))
            response = validation.handle_tf_response(data['answer'], correct_arr)
            return flask.jsonify(response)
        else:
            return flask.jsonify({'error': 'quest_id is required'}), 400
    
#-----------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=PORT)