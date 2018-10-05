import datetime

print("########")

now = datetime.datetime.now()
print(now)
print(now.isoformat())
print(now.strftime('%d/%m/%y=%H:%M:%S:%f'))

print("####")
today = datetime.date.today()
print(today)
print(today.isoformat())
print(today.strftime('%d/%m/%y'))

print("####")
t = datetime.time(hour=1,minute=10,second=5,microsecond=100)
print(t)
print(t.isoformat())
print(t.strftime('%H_%M_%S_%f'))

print("####")
print(now)
y = datetime.timedelta(days=365)
w = datetime.timedelta(weeks=1)
d = datetime.timedelta(days=1)
h = datetime.timedelta(hours=1)
m = datetime.timedelta(minutes=1)
s = datetime.timedelta(seconds=1)
ms = datetime.timedelta(microseconds=1)

print(now + y)
print(now + w)
print(now + d)
print(now + h)
print(now + m)
print(now + s)
print(now + ms)

print("####")
import time
print('#')
time.sleep(1)
print('#')
time.sleep(1)
print('#')
print(time.time()) # epoc time

print("########")
# Backup Sample
import os
import shutil
file_name = 'file_test_empty.txt'

if os.path.exists(file_name):
    shutil.copy(file_name,"{}.{}".format(
        file_name, now.strftime('%Y_%m_%d_%H_%M_%S')
    ))

