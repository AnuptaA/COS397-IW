#!/usr/bin/env python

import sqlite3

def create_dummy_database():
    # Connect to the SQLite database (it will create the file if it doesn't exist)
    conn = sqlite3.connect('dummy.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Create table dummy_table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS dummy_table (
        question_id INTEGER,
        question_image BLOB
    )
    ''')

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

    print("Dummy database and tables created successfully.")

# Function to print the dummy_table without formatting
def print_dummy_table():
    conn = sqlite3.connect('dummy.sqlite')  # Connect to the dummy database
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM dummy_table")
    rows = cursor.fetchall()
    
    print()
    print("----------------Beginning of dummy_table------------")

    # Define the column headers
    headers = ["Question ID", "Question Image (BLOB)"]
    print(" | ".join(headers))
    print("-" * len(" | ".join(headers)))  # Underline with hyphens

    if rows:
        for row in rows:
            # Since question_image is a BLOB, we will show its size instead of raw data
            question_image_size = len(row[1]) if row[1] else 0
            print(f"{row[0]}, Size: {question_image_size} bytes")
    else:
        print("No data in dummy_table.")
    
    print("----------------End of dummy_table------------")
    print()
    
    conn.close()

def add_question_to_dummy_database(question_id, image_path):
    # Connect to the SQLite database (it will create the file if it doesn't exist)
    conn = sqlite3.connect('dummy.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    cursor.execute('''
    INSERT INTO dummy_table (question_id, question_image)
    VALUES (?, ?)
    ''', (question_id, image_data))

    # Commit the changes and close the connection
    conn.commit()
    cursor.close()
    conn.close()

    print("Image inserted successfully into the dummy database.")

# Function to retrieve an image from the database
def retrieve_image_from_dummy_database(question_id, output_path):
        # Connect to the SQLite database
    conn = sqlite3.connect('dummy.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    cursor.execute('''
    SELECT question_image FROM dummy_table WHERE question_id = ?
    ''', (question_id,))
    
    # Fetch the image data
    image_data = cursor.fetchone()
    
    if image_data is not None:
        with open(output_path, 'wb') as image_file:
            image_file.write(image_data[0])
        print(f"Image retrieved and saved as {output_path}.")
    else:
        print("No image found for the given question_id.")

def main():
    # create_dummy_database()
    print_dummy_table()
    # add_question_to_dummy_database(1, '/Users/Jeremy/Desktop/F2024 Final Course Schedule.png')
    retrieve_image_from_dummy_database(1, '/Users/anupta/Desktop/JSchedule.png')
    # print_dummy_table()
    
if __name__ == '__main__':
    main()