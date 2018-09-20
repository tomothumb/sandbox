print("######")

d = {'x': 10, 'y': 20}
print(d)
print(type(d))
d['x'] = 100
print(d['x'])
print(d)

d['x'] = 'XXXX'
print(d)
d['z'] = 999
print(d)
d[1] = 11111
print(d)
print("######")

dd = dict(xx=10, yy=20)
print(dd)
ddd = dict([('xxx', 10), ('yyy', 20)])
print(ddd)

print("######")
# Dictionaly Method
# print(help(dict))

d = {'x': 10, 'y': 20}
print(d.keys())
print(d.values())
print(d)

d2 = {'x': 1000, 'z': 2000}
print(d2)
d.update(d2)
print(d)

print(d.get('x'))
print(d.get('none'))
# print(d['none']) # ERROR
print(type(d.get('none')))

pop = d.pop('x')
print(pop)
print(d)

del d['y']
print(d)

print("######")
d = {'x': 10, 'y': 20}
print(d)
d.clear()
print(d)

print("######")
d = {'x': 10, 'y': 20}
print('a' in d)
print('x' in d)

print("######")
# COPY1
x = {'x': 10, 'y': 20}
y = x
print(x)
print(y)
y['x'] = 1000
print(x)
print(y)

print("######")
# COPY2
x = {'x': 10, 'y': 20}
y = x.copy()
y['x'] = 1000
print(x)
print(y)

print("######")

fruits = {
    'apple' : 100,
    'banana': 200,
    'orange': 300
}
print(fruits['apple'])

print('########')
d = {'x': 100, 'y':200}
print(d.items())

for k,v in d.items():
    print(k,':', v)

print('########')
ranking = {
    'A': 100,
    'B': 85,
    'C': 95
}
print(sorted(ranking))
print(sorted(ranking,key=ranking.get))
print(sorted(ranking,key=ranking.get, reverse=True))

print('########')

s = 'aslfjkhasdfasvouizjxhcvnamfasd'
d = {}
for c in s:
    # if c not in d:
    #     d[c] = 0
    d.setdefault(c,0)
    d[c] += 1
print(d)
print(d['f'])
print('####')

from collections import defaultdict
d= defaultdict(int)
for c in s:
    d[c] +=1
print(d)
print(d['f'])