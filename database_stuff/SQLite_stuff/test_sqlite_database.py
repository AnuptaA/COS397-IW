#!/usr/bin/env python

# Description: Test File for SQLite database implemented in 
# manage_sqlite_database.py

import sqlite3

# checks what happens if has_image == Y then question_image is NULL
# Expected result : IntegrityError
def test_adding_invalid_question_1():
    # Connect to the SQLite database
    conn = sqlite3.connect('tigertrain.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Insert data into question_overviews table for questions 8 to 12
    question_overviews_data = [
        (13, "TrueFalse", "Minimum Spanning Trees")
    ]

    cursor.executemany('''
        INSERT INTO question_overviews (question_id, type, topic_area) 
        VALUES (?, ?, ?)
    ''', question_overviews_data)

    # Insert data into question_details table for questions 8 to 12
    question_details_data = [
        (13, 1, "Let G be any simple graph (no self-loops or parallel edges) with positive and distinct edge weights. Any MST of G must include the edge of minimum weight.", 'Y', None, 'T'),
    ]

    cursor.executemany('''
        INSERT INTO question_details (question_id, question_points, question_text, has_image, question_image, question_solution) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', question_details_data)

    # Commit the transaction
    conn.commit()

    # Close the connection
    conn.close()

# checks what happens if has_image == N then question_image is NOT NULL
# Expected result : IntegrityError
def test_adding_invalid_question_2():
    # Connect to the SQLite database
    conn = sqlite3.connect('tigertrain.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Insert data into question_overviews table for questions 8 to 12
    question_overviews_data = [
        (13, "TrueFalse", "Minimum Spanning Trees")
    ]

    cursor.executemany('''
        INSERT INTO question_overviews (question_id, type, topic_area) 
        VALUES (?, ?, ?)
    ''', question_overviews_data)

    with open('/Users/Jeremy/Desktop/F2024 Final Course Schedule.png', 'rb') as image_file:
        image_data = image_file.read()

    # Insert data into question_details table for questions 8 to 12
    question_details_data = [
        (13, 1, "Let G be any simple graph (no self-loops or parallel edges) with positive and distinct edge weights. Any MST of G must include the edge of minimum weight.", 'N', image_data, 'T'),
    ]

    cursor.executemany('''
        INSERT INTO question_details (question_id, question_points, question_text, has_image, question_image, question_solution) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', question_details_data)

    # Commit the transaction
    conn.commit()

    # Close the connection
    conn.close()