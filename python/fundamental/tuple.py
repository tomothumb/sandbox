print("######")

t = (1,2,3,4,1,2)
print(t)
type(t)
# t[0] = 100 # ERRRO
print(t[0])

print(t[-1])

print(t[2:5])

print(t)
print(t.index(1))
print(t.index(1,1))

print(t.count(1))

# print(help(tuple))

print("######")

t = ([1,2,3],[4,5,6])
print(t)

print(t[0][0])
t[0][0] = 100
print(t[0][0])

print("######")

t = 1,2,3
print(t)
t = 1,
print(type(t))
print(t)
t = 1
print(type(t))
t= ()
print(type(t))
print(t)

t = (1)
print(type(t))

t = ('test')
print(t)
print(type(t))

t = ('test',)
print(t)
print(type(t))

t = 1,
print(t+100)

print("#####")

new_tuple = (1,2,3)+(4,5,6)
print(new_tuple)
print(type(new_tuple))
new_tuple = (1)+(4,5,6)
print(new_tuple)
print(type(new_tuple))
new_tuple = (1,)+(4,5,6)
print(new_tuple)
print(type(new_tuple))


