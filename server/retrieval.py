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
    encoded_img = get_question_image(quest_id) if has_img else None

    solution = get_question_solution(quest_id)
    resources = get_question_resources(get_topic_area(quest_id))

    quest_details = {}

    # quest_details['id'] = 26

    quest_details['id'] = quest_id
    quest_details['type'] = quest_type
    quest_details['area'] = topic_area
    quest_details['pts'] = int(question_pts)
    quest_details['text'] = question_text
    quest_details['solution'] = solution
    quest_details['has_img'] = has_img
    quest_details['resources'] = resources

    # Solution: 0,2,6,8,3,5,1,4,7,9

    # Path to image
    quest_details['img'] = img
    quest_details['encoded_img'] = str(encoded_img)

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
        question['resources'] = get_question_resources(
                                get_topic_area(id)
                            )
        question['prompt_str'] = get_tf_prompt_str(id)
        
        tf_solution.append(question)
    
    return tf_solution

#-----------------------------------------------------------------------

def get_traversal_prompt_str(quest_details, data):
    prompt_str = "Hey, I'm a college student studying Data Strucutres & Algorithms and I am currently trying to answer the question \""
    prompt_str += (quest_details['text'] + "\" and ")
    prompt_str += "I thought the answer is \""
    prompt_str += (data['answer'] + "\" ") 
    prompt_str += "but it turns out that the correct answer given by my professor is actually \""
    prompt_str += (quest_details['solution'] + "\"" + "\n\n")
    prompt_str += "please explain to me the solution and help me understand where I might have gone wrong. "
    prompt_str += "Here is a description of the digraph in question: \n\n"
    prompt_str += """
    It contains the following Nodes: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.

    It contains the following edges (directed):
    0 → 2, 0 → 6
    1 → 5, 1 → 9
    2 → 8
    3 → 1, 3 → 4, 3 → 7
    4 → 0, 4 → 2, 4 → 5, 4 → 6, 4 → 8
    5 → 2
    8 → 3, 8 → 5
    8 → 3, 8 → 5
    9 → 3, 9 → 7

    """

    prompt_str += "(Please interpret \"Run BFS / DFS\" to mean \"trace through how the algorithm would go rather than actually implement the code for it\")"

    return prompt_str

#-----------------------------------------------------------------------

def get_tf_prompt_str(quest_id):
    prompt_str = "Please briefly explain to me why the answer to question \""
    prompt_str += (get_question_text(quest_id) + "\" is ")
    prompt_str += (get_question_solution(quest_id))
    prompt_str += " (Please only use plain text in your explanation, no notation)"
    return prompt_str