
print('########')
# loop

count = 0
while count < 5:
    print(count)
    count += 1

print('########')
count = 0
while True:
    if count >= 5:
        break
    if count == 2:
        count += 1
        continue
    print(count)
    count += 1

print('########')
count = 0
while count < 5:
    print(count)
    count += 1
else:
    print("Done!")


print('########')
count = 0
while count < 5:
    if(count == 2):
        print(count)
        break
    print(count)
    count += 1
else:
    print("Done!")


print('########')
num_list = [1,2,3,4,5]
for i in num_list:
    print(i)

for s in "abcde":
    print(s)
for name in ["My", "name", "is", "Mike"]:
    if(name == 'is'):
        break
    if (name == 'name'):
        continue
    print(name)

print('########')

for fruit in ["apple", "banana", "orange"]:
    if(fruit == 'banana'):
        print('stop eating')
        break
    print(fruit)
else:
    print('I ate all')


print('########')
num_list = [1,2,3,4,5,6,7,8]

for i in num_list:
    print(i)
print('########')
for i in range(4):
    print(i,'hello')
print('########')
for _ in range(4):
    print('hello')
print('########')
for i in range(3,10,2):
    print(i)

print('########')
i = 0
for fruit in ["apple", "banana", "orange"]:
    print(i,fruit)
    i+=1
print('########')

for i,fruit in enumerate(["apple", "banana", "orange"]):
    print(i,fruit)

print('########')
days = ['Mon','Teu','Wed']
fruits = ['apple','banana','orange']
drinks = ['coffee','tea','beer']

for i in range(len(days)):
    print(days[i], fruits[i], drinks[i])
print('########')
for day, fruit, drink in zip(days,fruits,drinks):
    print(day, fruit, drink)

print('########')
d = {'x': 100, 'y':200}
print(d.items())

for k,v in d.items():
    print(k,':', v)

print('########')
t= (1,2,3,4,5)
r = []
for i in t:
    if i % 2 == 0:
        r.append(i)
print(r)

r = [i for i in t if i % 2 == 0]
print(r)


print('########')
w = ['mon','tue','wed']
f = ['coffee','milk','water']
d = {}
for x,y in zip(w,f):
    d[x] = y
print(d)

d = {x:y for x,y in zip(w,f)}
print(d)

print('########')
s = set()
for i in range(10):
    if i % 2 == 0:
        s.add(i)
print(s)

s = {i for i in range(10) if i % 2 == 0}
print(s)


print('########')
def g():
    for i in range(10):
        yield i

def g2():
    for i in range(10):
        yield i

def g3():
    for i in range(10):
        yield i
g = g()
print(type(g))
print(next(g))
print(next(g))
print(next(g))
print(next(g))

g2 = g2()
g2 = (i for i in range(10) if i % 2 == 0)
print(type(g2))
print(next(g2))
print(next(g2))
print(next(g2))
print(next(g2))

g3 = g3()
g3 = tuple(i for i in range(10))
print(type(g3))
print(g3)



# count = 0
# while True:
#     word = input('Enter: ')
#     if(word == 'ok'):
#         break
#     if (int(word) == 100):
#         break
#     print("next")