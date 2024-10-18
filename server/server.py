#!/usr/bin/env python

#-----------------------------------------------------------------------
# server.py
# Author: Anupta Argo
#-----------------------------------------------------------------------

from manage_sqlite_database import *
import base64
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

def get_traversal(quest_id):
    # Traversal question ids = 26, 27, 28

    # SELECT * FROM question_overviews, question_details WHERE 
    # question_overviews.question_id = 26 AND 
    # question_overviews.question_id = question_details.question_id;

    # quest_id = flask.request.args.get('quest_id')

    quest_type = get_question_type(quest_id)
    topic_area = get_topic_area(quest_id)
    question_pts = get_question_points(quest_id)
    question_text = get_question_text(quest_id)
    has_img = get_question_has_image(quest_id)

    img = "img/question_img/s24_q2.png" if has_img else None
    # img = get_question_image(quest_id) if has_img else None

    solution = get_question_solution(quest_id)

    quest_details = {}

    quest_details['id'] = 26
    quest_details['type'] = quest_type
    quest_details['area'] = topic_area

    quest_details['pts'] = int(question_pts)
    # quest_details['pts'] = 0.25

    quest_details['text'] = question_text
    quest_details['solution'] = solution

    # Solution: 0,2,6,8,3,5,1,4,7,9

    quest_details['img'] = img

    # if has_img:
    #     quest_details['img'] =  base64.b64encode(image_blob[0]).decode('utf-8')
    return quest_details

#-----------------------------------------------------------------------

# app instance
app = flask.Flask(__name__)
CORS(app)

@app.route('/traversals', methods=['GET', 'POST'])
def return_info():
    quest_id = 26
    quest_details = get_traversal(quest_id)

    if flask.request.method == 'GET':
        return flask.jsonify(quest_details)
    
    if flask.request.method == 'POST':
        data = flask.request.get_json()
        print(data)
        ans = {}
        ans['isValid'] = handle_traversals_ans(data['answer'], quest_details['solution'])
        return flask.jsonify(ans)

#-----------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=PORT)