#!/usr/bin/env python

#-----------------------------------------------------------------------
# server.py
# Author: Anupta Argo
#-----------------------------------------------------------------------

from manage_sqlite_database import *
import base64
import math
import flask
from flask_cors import CORS

#-----------------------------------------------------------------------

PORT = 8080

#-----------------------------------------------------------------------

def handle_traversals_ans(user_seq, correct_seq):
    '''
    This function validates and returns correctness for traversal
    questions.

    Args:
        user_seq: String sequence representing the traversal order found
        by the user.
        correct_seq: String sequence representing the correct traversal
        order.

    Returns:
        correct: Boolean value that represents whether the user answer
        is correct.
    '''
    return 1 if user_seq == correct_seq else 0

#-----------------------------------------------------------------------

def get_question(quest_id):
    # Traversal question ids = 26, 27, 28

    # SELECT * FROM question_overviews, question_details WHERE 
    # question_overviews.question_id = 26 AND 
    # question_overviews.question_id = question_details.question_id;

    # Solution for 26: 0,2,6,8,3,5,1,4,7,9

    quest_type = get_question_type(quest_id)
    topic_area = get_topic_area(quest_id)


    question_pts = get_question_points(quest_id)
    question_text = get_question_text(quest_id)
    has_img = get_question_has_image(quest_id)

    img = "/img/question_img/s24_q2.png" if has_img else None
    # img = get_question_image(quest_id) if has_img else None

    solution = get_question_solution(quest_id)

    quest_details = {}

    # quest_details['id'] = 26

    quest_details['id'] = quest_id
    quest_details['type'] = quest_type
    quest_details['area'] = topic_area
    quest_details['pts'] = int(question_pts)
    quest_details['text'] = question_text
    quest_details['solution'] = solution
    quest_details['has_img'] = True if has_img == 'Y' else False

    # Solution: 0,2,6,8,3,5,1,4,7,9

    # Path to image
    quest_details['img'] = img

    return quest_details

#-----------------------------------------------------------------------

def get_tf_question(quest_id):
    # groups questions by 3
    start = 3 * math.ceil(quest_id / 3) - 2
    quest_ids = [start, start + 1, start + 2]
    tf_question = []

    for id in quest_ids:
        quest = get_question(id)
        tf_question.append(quest)
    
    return tf_question

#-----------------------------------------------------------------------

# app instance
app = flask.Flask(__name__)
CORS(app)

#-----------------------------------------------------------------------

# Homepage route
@app.route('/', methods=['GET'])
def index():
    questions = []

    for i in range(1, 29):
        question = get_question(i)
        questions.append(question)

    return flask.jsonify(questions)

#-----------------------------------------------------------------------

# Solutions route
@app.route('/solutions', methods=['GET'])
def solutions():
    quest_id = flask.request.args.get('quest_id')
    quest_details = get_question(quest_id)
    return flask.jsonify(quest_details)

#-----------------------------------------------------------------------

# Traversal questions route
@app.route('/traversals', methods=['GET', 'POST'])
def traversals():
    if flask.request.method == 'GET':
        quest_id = flask.request.args.get('quest_id')
        if quest_id:
            quest_details = get_question(quest_id)
            return flask.jsonify(quest_details)
        else:
            return flask.jsonify({'error': 'Question ID is required'}), 400

    if flask.request.method == 'POST':
        data = flask.request.get_json()
        quest_id = flask.request.args.get('quest_id')
        if quest_id:
            quest_details = get_question(quest_id)
            is_valid = handle_traversals_ans(data['answer'], quest_details['solution'])
            return flask.jsonify({'isValid': is_valid})
        else:
            return flask.jsonify({'error': 'quest_id is required'}), 400

#-----------------------------------------------------------------------
    
# True/False questions route
@app.route('/truefalse', methods=['GET', 'POST'])
def truefalse():
    if flask.request.method == 'GET':
        quest_id = flask.request.args.get('quest_id')
        if quest_id:
            quest_details = get_tf_question(int(quest_id))
            return flask.jsonify(quest_details)
        else:
            return flask.jsonify({'error': 'Question ID is required'}), 400
    
    if flask.request.method == 'POST':
        data = flask.request.get_json()
        quest_id = flask.reqeust.args.get('quest_id')
        if quest_id:
            quest_details = get_tf_question(quest_id)
        else:
            return flask.jsonify({'error': 'quest_id is required'}), 400
    
#-----------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=PORT)