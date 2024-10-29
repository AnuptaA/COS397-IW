#!/usr/bin/env python

#-----------------------------------------------------------------------
# server.py
# Author: Anupta Argo '26 and Jeremy Michoma '26
#-----------------------------------------------------------------------

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
