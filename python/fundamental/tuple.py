print("######")

t = (1, 2, 3, 4, 1, 2)
print(t)
print(type(t))
# t[0] = 100 # ERROR
print(t[0])

print(t[-1])

print(t[2:5])

print(t)
print(t.index(1))
print(t.index(1, 1))

print(t.count(1))


print("######")

t = ([1, 2, 3], [4, 5, 6])
print(t)

print(t[0][0])
t[0][0] = 100
print(t[0][0])

print("######")

t = 1, 2, 3
print(t)
t = 1,
print(type(t))
print(t)
t = 1
print(type(t))

t = () # suple
print(type(t))
print(t)

t = (1) # int
print(type(t))

t = (1,) # tuple
print(type(t))

t = ('test') # string
print(t)
print(type(t))

t = ('test',) # tuple
print(t)
print(type(t))

t = 1,
#print(t + 100) # ERROR

print("#####")

new_tuple = (1, 2, 3) + (4, 5, 6)
print(new_tuple)
print(type(new_tuple))

#new_tuple = (1) + (4, 5, 6) # ERROR

new_tuple = (1,) + (4, 5, 6)
print(new_tuple)
print(type(new_tuple))

print("#####")
num_tuple = (10, 20)
print(num_tuple)

x, y = num_tuple
print(x, y)

x, y = (10,20)
print(x, y)

x, y = 10,20
print(x, y)

min, max = 0,100
print(min, max)

print("#####")

a, b = 10,20
print(a,b)
a, b = b,a
print(a,b)

print("#####")


print(help(tuple))

print("#####")

# how to use

chose_from_two = ('A','B','C') # forbid to insert
answer = []
answer.append('A')
answer.append('C')
print(chose_from_two)
print(answer)
