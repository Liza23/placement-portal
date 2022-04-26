import csv
import argparse
import psycopg2                                                                                 # https://pynative.com/python-postgresql-tutorial/
from psycopg2 import extras

def get_csv_data(path, relation):
    rows = []
    with open(f"{path}/{relation}.csv", 'r') as f:
        parser = csv.reader(f)
        header = next(parser)
        for row in parser:
            row = [None if ele == "NULL" else ele for ele in row]
            rows.append(tuple(row))                                                             # https://www.geeksforgeeks.org/python-convert-a-list-into-a-tuple/
    print(header, rows)
    return header, rows

parser = argparse.ArgumentParser()
parser.add_argument("--name", required=True)
parser.add_argument("--user", required=True)
parser.add_argument("--pswd", required=True)
parser.add_argument("--host", required=True)
parser.add_argument("--port", required=True)
parser.add_argument("--ddl", required=True)
parser.add_argument("--data", required=True)
args = parser.parse_args()

conn = psycopg2.connect(f"dbname={args.name} user={args.user} password={args.pswd} host={args.host} port={args.port}")
conn.autocommit = True                                                                          # https://stackoverflow.com/questions/18068901/python-psycopg2-not-inserting-into-postgresql-table
cur = conn.cursor()

cur.execute(open(args.ddl, 'r').read())                                                         # https://stackoverflow.com/questions/17261061/execute-sql-schema-in-psycopg2-in-python

relations = ['coordinator', 'program', 'department', 'profile', 'company', 'recruiter', 'jaf', 'eligible', 'student', 'resume', 'applies_for', 'shortlist', 'offer']

for relation in relations:
    header, rows = get_csv_data(args.data, relation)
    extras.execute_values(cur, f"INSERT INTO {relation} ({','.join(header)}) VALUES %s", rows)  # https://www.psycopg.org/docs/extras.html?highlight=execute_values#psycopg2.extras.execute_values

cur.close()
conn.close()