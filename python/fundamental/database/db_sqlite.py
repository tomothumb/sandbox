import sqlite3

conn = sqlite3.connect('./database/db_sqlite.sqlite')

curs = conn.cursor()
# curs.execute(
#     'CREATE TABLE persons(id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING)'
# )
# conn.commit()
#
# curs.execute(
#     'INSERT INTO persons(name) values("Mike")'
# )
# conn.commit()

print("########")
curs.execute(
    'SELECT * FROM persons'
)
print(curs.fetchall())

print("########")
curs.execute(
    'INSERT INTO persons(name) values("Nancy")'
)
curs.execute(
    'INSERT INTO persons(name) values("Jun")'
)
print(curs.fetchall())
conn.commit()

curs.execute(
    'UPDATE persons set name = "Michel" WHERE name = "Mike"'
)
print(curs.fetchall())
conn.commit()


conn.close()