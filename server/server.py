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
        correct: Integer value that represents whether the user answer
        is correct.
    '''
    return 1 if user_seq == correct_seq else 0

#-----------------------------------------------------------------------

def handle_tf_response(user_arr, correct_arr):
    '''
    This function validates and returns correctness for true/false
    questions.

    Args:
        user_seq: List of user answers formatted as strings
        correct_seq: List of correct true/false formatted as strings

    Returns:

    '''
    response = {}

    if len(user_arr) < len(correct_arr):
        response['message'] = "Question incomplete :("
        response['isValid'] = 0

    elif len(user_arr) > len(correct_arr):
        response['message'] = "There was a server error"
        response['isValid'] = -1

    else:
        ctr = 0
        for i in range(len(correct_arr)):
            if user_arr[i] != correct_arr[i]:
                ctr += 1

        if ctr == 0:
            response['message'] = "Correct answer, good work!"
            response['isValid'] = 1
        elif ctr == 1:
            response['message'] = "1 incorrect answer!"
            response['isValid'] = 0
        else:
            response['message'] = f"{ctr} incorrect answers!"
            response['isValid'] = 0

    return response

#-----------------------------------------------------------------------

def get_tf_ans_arr(quest_id):
    tf_solution = get_tf_solution(quest_id)
    tf_answers = [question['answer'] for question in tf_solution]
    return tf_answers

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
    has_img = True if get_question_has_image(quest_id) == 'Y' else False

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
    quest_details['has_img'] = has_img

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

def get_tf_solution(quest_id):
    # groups questions by 3
    start = 3 * math.ceil(quest_id / 3) - 2
    quest_ids = [start, start + 1, start + 2]
    tf_solution = []

    for id in quest_ids:
        question = {}
        question['id'] = id
        question['text'] = get_question_text(id)
        question['answer'] = get_question_solution(id)
        if id % 3 == 0:
            question['exp'] = "Are you the strongest because you're Satoru Gojo? Or are you Satoru Gojo because you're the strongest?"
        elif id % 3 == 1:
            question['exp'] = "Hi if you're seeing this I'm (Anupta) eating Hoagie Haven right now"
        else:
            question['exp'] = "Why are Chipotle portion sizes so small :("
        tf_solution.append(question)
    
    return tf_solution

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
        question = get_question(i)
        questions.append(question)

    return flask.jsonify(questions)

#-----------------------------------------------------------------------

# Traversal solutions route
@app.route('/solutions/traversals', methods=['GET'])
def traversals_solutions():

    quest_id = flask.request.args.get('quest_id')
    quest_details = get_question(quest_id)

    return flask.jsonify(quest_details)

#-----------------------------------------------------------------------

# True/False solutions route
@app.route('/solutions/truefalse', methods=['GET'])
def truefalse_solutions():

    quest_id = flask.request.args.get('quest_id')
    quest_details = get_tf_solution(int(quest_id))

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
        quest_id = flask.request.args.get('quest_id')
        if quest_id:
            correct_arr = get_tf_ans_arr(int(quest_id))
            response = handle_tf_response(data['answer'], correct_arr)
            return flask.jsonify(response)
        else:
            return flask.jsonify({'error': 'quest_id is required'}), 400
    
#-----------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=PORT)