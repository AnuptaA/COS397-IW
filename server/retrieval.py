#!/usr/bin/env python

#-----------------------------------------------------------------------
# retrieval.py
# Author: Anupta Argo '26 and Jeremy Michoma '26
#-----------------------------------------------------------------------

from manage_sqlite_database import *
import math

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