#!/usr/bin/env python

import sqlite3
# import test_sqlite_database as test

def create_sqlite_database():
    # Connect to the SQLite database (it will create the file if it doesn't exist)
    conn = sqlite3.connect('tigertrain.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Create table question_overviews
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS question_overviews (
        question_id INTEGER PRIMARY KEY,
        type TEXT,
        topic_area TEXT
    )
    ''')

    # Create table question_details
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS question_details (
        question_id INTEGER,
        question_points INTEGER,
        question_text TEXT,
        has_image TEXT CHECK(has_image IN ('Y', 'N')),
        question_image BLOB,
        question_solution TEXT,
        FOREIGN KEY (question_id) REFERENCES question_overviews (question_id),
        CHECK (
        (has_image = 'N' AND question_image IS NULL) OR 
        (has_image = 'Y' AND question_image IS NOT NULL)
        )
    )
    ''')

    # Create table question_resources
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS question_resources (
        topic_area TEXT,
        resources TEXT
    )
    ''')

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

    print("Database and tables created successfully.")

# Function to print the question_overviews table
def print_question_overviews_table():
    conn = sqlite3.connect('tigertrain.sqlite')
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM question_overviews")
    rows = cursor.fetchall()
   
    print()
    print("------------Beginning of question_overviews----------------")
    headers = ["Question ID", "Type", "Topic Area"]
    print(" | ".join(headers))
    print("-" * len(" | ".join(headers)))  # Underline with hyphens

    if rows:
        for row in rows:
            print(row)
    else:
        print("No data in question_overviews table.")


    print("------------------End of question_overviews----------------")
    print()
    
    conn.close()

# Function to print the question_details table
def print_question_details_table():
    conn = sqlite3.connect('tigertrain.sqlite')
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM question_details")
    rows = cursor.fetchall()

    print()
    print("------------Beginning of question_details----------------")
    # Define the column headers
    headers = ["Question ID", "Points", "Question Text", "Has Image (Y/N)", "Image", "Solution"]
    print(" | ".join(headers))
    print("-" * len(" | ".join(headers)))  # Underline with hyphens

    if rows:
        for row in rows:
            # Since question_image is a BLOB, we will show its size instead of raw data
            question_image_size = len(row[4]) if row[4] else 0

            # Use textwrap.fill to wrap text if necessary (e.g., long topic areas)
            formatted_row = [str(item) for item in row]
            formatted_row[4] = f"Image Size: {question_image_size} bytes"
            print(" | ".join(formatted_row))
    else:
        print("No data in question_details table.")

    print("------------------End of question_details----------------")
    print()
    
    conn.close()

# Function to print the question_resources table
def print_question_resources_table():
    conn = sqlite3.connect('tigertrain.sqlite')
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM question_resources")
    rows = cursor.fetchall()
    
    print()
    print("----------------Beginning of question_resources------------")
    # Define the column headers
    headers = ["Topic Area", "Resources"]
    print(" | ".join(headers))
    print("-" * len(" | ".join(headers)))  # Underline with hyphens

    if rows:
        for row in rows:
            print(row)
    else:
        print("No data in question_resources table.")

    print("------------------End of question_resources----------------")
    print()
    
    conn.close()

def add_question_7_s24_to_sqlite_database():
    # Connect to the SQLite database
    conn = sqlite3.connect('tigertrain.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Insert data into question_overviews table
    question_overviews_data = [
        (1, "TrueFalse", "Minimum Spanning Trees"),
        (2, "TrueFalse", "Shortest Paths"),
        (3, "TrueFalse", "Maxflows and Mincuts"),
        (4, "TrueFalse", "Maxflows and Mincuts"),
        (5, "TrueFalse", "Randomness")
    ]

    cursor.executemany('''
        INSERT INTO question_overviews (question_id, type, topic_area) 
        VALUES (?, ?, ?)
    ''', question_overviews_data)

    # Insert data into question_details table
    question_details_data = [
        (1, 1, "Let G be a weighted digraph. If there is a unique minimum weight edge in G, then this edge is in any MST of G.", 'N', None, 'T'),
        (2, 1, "Let G be a weighted digraph and let s and t be two vertices in G. Any shortest path from s to t in G is also a shortest path from s to t in the graph obtained from G by squaring the weight of each edge.", 'N', None, 'F'),
        (3, 1, "Let G be a flow network with source s and sink t. Given a minimum weight st-cut in G, the value of the maximum flow in G can be computed in time O(E + V ).", 'N', None, 'T'),
        (4, 1, "Let f be a flow. Assume that there are two augmenting paths with respect to f (different on at least one edge), one with bottleneck capacity 5 and the other with bottleneck capacity 10. Then, the value of the maximum flow is at least 15 more than the value of f.", 'N', None, 'F'),
        (5, 1, "Let G be an unweighted graph with a unique global mincut of size 2. Suppose that we execute Karger’s algorithm on G once, and that in this execution, all the edges are assigned unique weights and the two edges crossing the mincut are assigned the two largest weights. Then, Karger’s algorithm finds the minimum cut in G.", 'N', None, 'T')
    ]

    cursor.executemany('''
        INSERT INTO question_details (question_id, question_points, question_text, has_image, question_image, question_solution) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', question_details_data)

    # Commit the transaction
    conn.commit()

    # Close the connection
    conn.close()

def add_question_12_f17_to_sqlite_database():
    # Connect to the SQLite database
    conn = sqlite3.connect('tigertrain.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Insert data into question_overviews table for questions 6 and 7
    question_overviews_data = [
        (6, "TrueFalse", "Minimum Spanning Trees"),
        (7, "TrueFalse", "Minimum Spanning Trees")
    ]

    cursor.executemany('''
        INSERT INTO question_overviews (question_id, type, topic_area) 
        VALUES (?, ?, ?)
    ''', question_overviews_data)

    # Insert data into question_details table for questions 6 and 7
    question_details_data = [
        (6, 1, "Let G be a connected graph with distinct edge weights. Let S be a cut that contains exactly 4 crossing edges e1, e2, e3, and e4 such that weight(e1) < weight(e2) < weight(e3) < weight(e4). For every such edge-weighted graph G and every such cut S, Kruskal’s algorithm adds edge e1 to the MST.", 'N', None, 'T'),
        (7, 1, "Let G be a connected graph with distinct edge weights. Let S be a cut that contains exactly 4 crossing edges e1, e2, e3, and e4 such that weight(e1) < weight(e2) < weight(e3) < weight(e4). For every such edge-weighted graph G and every such cut S, if edges e1 and e2 are both in the MST, then Kruskal’s algorithm adds e1 to the MST before e2.", 'N', None, 'T')
    ]

    cursor.executemany('''
        INSERT INTO question_details (question_id, question_points, question_text, has_image, question_image, question_solution) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', question_details_data)

    # Commit the transaction
    conn.commit()

    # Close the connection
    conn.close()

def add_question_10b_s15_to_sqlite_database():
    # Connect to the SQLite database
    conn = sqlite3.connect('tigertrain.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Insert data into question_overviews table for questions 8 to 12
    question_overviews_data = [
        (8, "TrueFalse", "Minimum Spanning Trees"),
        (9, "TrueFalse", "Minimum Spanning Trees"),
        (10, "TrueFalse", "Minimum Spanning Trees"),
        (11, "TrueFalse", "Minimum Spanning Trees"),
        (12, "TrueFalse", "Minimum Spanning Trees")
    ]

    cursor.executemany('''
        INSERT INTO question_overviews (question_id, type, topic_area) 
        VALUES (?, ?, ?)
    ''', question_overviews_data)

    # Insert data into question_details table for questions 8 to 12
    question_details_data = [
        (8, 1, "Let G be any simple graph (no self-loops or parallel edges) with positive and distinct edge weights. Any MST of G must include the edge of minimum weight.", 'N', None, 'T'),
        (9, 1, "Let G be any simple graph (no self-loops or parallel edges) with positive and distinct edge weights. Any MST of G must exclude the edge of maximum weight.", 'N', None, 'F'),
        (10, 1, "Let G be any simple graph (no self-loops or parallel edges) with positive and distinct edge weights. The MST of G is unique.", 'N', None, 'T'),
        (11, 1, "Let G be any simple graph (no self-loops or parallel edges) with positive and distinct edge weights. If the weights of all edges incident to any vertex v are increased by 17, then any MST in G is an MST in the modified edge-weighted graph.", 'N', None, 'F'),
        (12, 1, "Let G be any simple graph (no self-loops or parallel edges) with positive and distinct edge weights. If the weights of all edges in G are increased by 17, then any MST in G is an MST in the modified edge-weighted graph.", 'N', None, 'T')
    ]

    cursor.executemany('''
        INSERT INTO question_details (question_id, question_points, question_text, has_image, question_image, question_solution) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', question_details_data)

    # Commit the transaction
    conn.commit()

    # Close the connection
    conn.close()

def add_question_10c_s15_to_sqlite_database():
    # Connect to the SQLite database
    conn = sqlite3.connect('tigertrain.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Insert data into question_overviews table for questions 13 to 17
    question_overviews_data = [
        (13, "TrueFalse", "Shortest Paths"),
        (14, "TrueFalse", "Shortest Paths"),
        (15, "TrueFalse", "Shortest Paths"),
        (16, "TrueFalse", "Shortest Paths"),
        (17, "TrueFalse", "Shortest Paths")
    ]

    cursor.executemany('''
        INSERT INTO question_overviews (question_id, type, topic_area) 
        VALUES (?, ?, ?)
    ''', question_overviews_data)

    # Insert data into question_details table for questions 13 to 17
    question_details_data = [
        (13, 1, "Let G be any simple digraph (no self-loops or parallel edges) with positive and distinct edge weights. Any shortest path from s to t in G must include the edge of minimum weight.", 'N', None, 'F'),
        (14, 1, "Let G be any simple digraph (no self-loops or parallel edges) with positive and distinct edge weights. Any shortest path from s to t in G must exclude the edge of maximum weight.", 'N', None, 'F'),
        (15, 1, "Let G be any simple digraph (no self-loops or parallel edges) with positive and distinct edge weights. The shortest path from s to t in G is unique.", 'N', None, 'F'),
        (16, 1, "Let G be any simple digraph (no self-loops or parallel edges) with positive and distinct edge weights. If the weights of all edges leaving s are increased by 17, then any shortest path from s to t in G is a shortest path in the modified edge-weighted digraph.", 'N', None, 'T'),
        (17, 1, "Let G be any simple digraph (no self-loops or parallel edges) with positive and distinct edge weights. If the weights of all edges in G are increased by 17, then any shortest path from s to t in G is a shortest path in the modified edge-weighted digraph.", 'N', None, 'F')
    ]

    cursor.executemany('''
        INSERT INTO question_details (question_id, question_points, question_text, has_image, question_image, question_solution) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', question_details_data)

    # Commit the transaction
    conn.commit()

    # Close the connection
    conn.close()

def add_question_7a_f14_to_sqlite_database():
    # Connect to the SQLite database
    conn = sqlite3.connect('tigertrain.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Insert data into question_overviews table for questions 18 to 21
    question_overviews_data = [
        (18, "TrueFalse", "Shortest Paths"),
        (19, "TrueFalse", "Shortest Paths"),
        (20, "TrueFalse", "Shortest Paths"),
        (21, "TrueFalse", "Shortest Paths")
    ]

    cursor.executemany('''
        INSERT INTO question_overviews (question_id, type, topic_area) 
        VALUES (?, ?, ?)
    ''', question_overviews_data)

    # Insert data into question_details table for questions 18 to 21
    question_details_data = [
        (18, 1, "Consider an edge-weighted digraph G with distinct and positive edge weights, a source vertex s, and a destination vertex t. Assume that G contains at least 3 vertices, has no parallel edges or self loops, and that every vertex is reachable from s. Any shortest s -> t path must include the lightest edge.", 'N', None, 'F'),
        (19, 1, "Consider an edge-weighted digraph G with distinct and positive edge weights, a source vertex s, and a destination vertex t. Assume that G contains at least 3 vertices, has no parallel edges or self loops, and that every vertex is reachable from s. Any shortest s -> t path must include the second lightest edge.", 'N', None, 'F'),
        (20, 1, "Consider an edge-weighted digraph G with distinct and positive edge weights, a source vertex s, and a destination vertex t. Assume that G contains at least 3 vertices, has no parallel edges or self loops, and that every vertex is reachable from s. Any shortest s -> t path must exclude the heaviest edge.", 'N', None, 'F'),
        (21, 1, "Consider an edge-weighted digraph G with distinct and positive edge weights, a source vertex s, and a destination vertex t. Assume that G contains at least 3 vertices, has no parallel edges or self loops, and that every vertex is reachable from s. The shortest s -> t path is unique.", 'N', None, 'F')
    ]

    cursor.executemany('''
        INSERT INTO question_details (question_id, question_points, question_text, has_image, question_image, question_solution) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', question_details_data)

    # Commit the transaction
    conn.commit()

    # Close the connection
    conn.close()

def add_question_7b_f14_to_sqlite_database():
    # Connect to the SQLite database
    conn = sqlite3.connect('tigertrain.sqlite')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Insert data into question_overviews table for questions 22 to 25
    question_overviews_data = [
        (22, "TrueFalse", "Minimum Spanning Trees"),
        (23, "TrueFalse", "Minimum Spanning Trees"),
        (24, "TrueFalse", "Minimum Spanning Trees"),
        (25, "TrueFalse", "Minimum Spanning Trees")
    ]

    cursor.executemany('''
        INSERT INTO question_overviews (question_id, type, topic_area) 
        VALUES (?, ?, ?)
    ''', question_overviews_data)

    # Insert data into question_details table for questions 22 to 25
    question_details_data = [
        (22, 1, "Consider an edge-weighted graph G with distinct and positive edge weights. Assume that G contains at least 3 vertices, has no parallel edges or self loops, and is connected. Any MST must include the lightest edge.", 'N', None, 'T'),
        (23, 1, "Consider an edge-weighted graph G with distinct and positive edge weights. Assume that G contains at least 3 vertices, has no parallel edges or self loops, and is connected. Any MST must include the second lightest edge.", 'N', None, 'T'),
        (24, 1, "Consider an edge-weighted graph G with distinct and positive edge weights. Assume that G contains at least 3 vertices, has no parallel edges or self loops, and is connected. Any MST must exclude the heaviest edge.", 'N', None, 'F'),
        (25, 1, "Consider an edge-weighted graph G with distinct and positive edge weights. Assume that G contains at least 3 vertices, has no parallel edges or self loops, and is connected. The MST is unique.", 'N', None, 'T')
    ]

    cursor.executemany('''
        INSERT INTO question_details (question_id, question_points, question_text, has_image, question_image, question_solution) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', question_details_data)

    # Commit the transaction
    conn.commit()

    # Close the connection
    conn.close()

def add_question_2_s24_to_sqlite_database():
    # Connect to the SQLite database
    conn = sqlite3.connect('tigertrain.sqlite')
    cursor = conn.cursor()
    
    # Insert data into question_overviews table for questions 26 to 28
    question_overviews_data = [
        (26, "Traversals", "Graphs and Digraphs II"),
        (27, "Traversals", "Graphs and Digraphs II"),
        (28, "Traversals", "Graphs and Digraphs II")
    ]
    
    cursor.executemany('''
        INSERT INTO question_overviews (question_id, type, topic_area) 
        VALUES (?, ?, ?)
    ''', question_overviews_data)
    
    # Read the image file as binary data
    with open('../img/s24_q2.png', 'rb') as file:
        image_data = file.read()
    
    # Insert data into question_details table for questions 26 to 28
    question_details_data = [
        (26, 3, "Run depth-first search and breadth-first search on the following digraph, starting from vertex 0. Assume the adjacency lists are in sorted order: for example, when iterating over the edges leaving vertex 4, consider the edge 4->0 before either 4->2, 4->5, 4->6 or 4->8. List the 10 vertices in the order they are removed from the queue during the execution of BFS.", 'Y', image_data, "0,2,6,8,3,5,1,4,7,9"),
        (27, 3, "Run depth-first search and breadth-first search on the following digraph, starting from vertex 0. Assume the adjacency lists are in sorted order: for example, when iterating over the edges leaving vertex 4, consider the edge 4->0 before either 4->2, 4->5, 4->6 or 4->8. List the 10 vertices in DFS preorder", 'Y', image_data, "0,2,8,3,1,5,9,7,4,6"),
        (28, 3, "Run depth-first search and breadth-first search on the following digraph, starting from vertex 0. Assume the adjacency lists are in sorted order: for example, when iterating over the edges leaving vertex 4, consider the edge 4->0 before either 4->2, 4->5, 4->6 or 4->8. List the 10 vertices in DFS postorder.", 'Y', image_data, "5,7,9,1,6,4,3,8,2,0")
    ]
    
    cursor.executemany('''
        INSERT INTO question_details (question_id, question_points, question_text, has_image, question_image, question_solution) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', question_details_data)
    
    # Commit the transaction
    conn.commit()
    
    # Close the connection
    conn.close()

def get_question_details(question_id):
    # Connect to the SQLite database
    conn = sqlite3.connect('tigertrain.sqlite')
    cursor = conn.cursor()
    
    # SQL query to get the question details for the given question_id
    query = '''
    SELECT 
        question_overviews.question_id, 
        question_overviews.type, 
        question_overviews.topic_area,
        question_details.question_points,
        question_details.question_text,
        question_details.has_image,
        question_details.question_image,
        question_details.question_solution
    FROM question_overviews, question_details
    WHERE question_overviews.question_id = question_details.question_id
    AND question_overviews.question_id = ?
    '''
    
    # Execute the query and fetch the result
    cursor.execute(query, (question_id,))
    result = cursor.fetchone()
    
    # Close the connection
    conn.close()
    
    # If no result is found, return None
    if result is None:
        return None
    
    # Return the result as a tuple
    return result

def get_question_type(question_id):
    return get_question_details(question_id)[1]

def get_topic_area(question_id):
    return get_question_details(question_id)[2]

def get_question_points(question_id):
    return get_question_details(question_id)[3]

def get_question_text(question_id):
    return get_question_details(question_id)[4]

def get_question_has_image(question_id):
    return get_question_details(question_id)[5]

def get_question_image(question_id):
    return get_question_details(question_id)[6]

def get_question_solution(question_id):
    return get_question_details(question_id)[7]

def main():
    # create_sqlite_database()
    # print_question_overviews_table()
    # print_question_details_table()
    print(get_question_type(26))
    

    # print("After inserting stuff")
    # add_question_7_s24_to_sqlite_database()
    # add_question_12_f17_to_sqlite_database()
    # add_question_10b_s15_to_sqlite_database()
    # add_question_10c_s15_to_sqlite_database()
    # add_question_7a_f14_to_sqlite_database()
    # add_question_7b_f14_to_sqlite_database()
    # add_question_2_s24_to_sqlite_database()
    # print_question_overviews_table()
    # print_question_details_table()
    # print(get_question_details(20))
    # print(get_question_type(20))
    # print(get_topic_area(20))
    # print(get_question_points(20))
    # print(get_question_text(20))
    # print(get_question_has_image(20))
    # print(get_question_image(20))
    # print(get_question_solution(20))

if __name__ == '__main__':
    main()
