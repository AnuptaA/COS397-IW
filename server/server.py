#!/usr/bin/env python

#-----------------------------------------------------------------------
# server.py
# Author: Anupta Argo
#-----------------------------------------------------------------------

from manage_sqlite_database import *
import base64
from flask import Flask, jsonify
from flask_cors import CORS

#-----------------------------------------------------------------------

PORT = 8080

#-----------------------------------------------------------------------

def handle_traversals(user_seq, correct_seq):
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
    return user_seq == correct_seq

#-----------------------------------------------------------------------

# app instance
app = Flask(__name__)
CORS(app)

@app.route('/api/home', methods=['GET'])
def return_info():
    # Traversal question ids = 26, 27, 28

    # SELECT * FROM question_overviews, question_details WHERE 
    # question_overviews.question_id = 26 AND 
    # question_overviews.question_id = question_details.question_id;
    
    quest_id = 26
    quest_type = get_question_type(quest_id)
    topic_area = get_topic_area(quest_id)
    question_pts = get_question_points(quest_id)
    question_text = get_question_text(quest_id)
    has_img = get_question_has_image(quest_id)

    img = get_question_image(quest_id) if has_img else None
    solution = get_question_solution(quest_id)

    quest_details = {}

    quest_details['id'] = 26
    quest_details['type'] = quest_type
    quest_details['area'] = topic_area
    quest_details['pts'] = question_pts
    quest_details['text'] = question_text
    quest_details['solution'] = solution

    # Solution: 0,2,6,8,3,5,1,4,7,9

    quest_details['img'] = None

    # if has_img:
    #     quest_details['img'] =  base64.b64encode(image_blob[0]).decode('utf-8')

    return jsonify(quest_details)

#-----------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=PORT)