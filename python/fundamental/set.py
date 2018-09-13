print("#######")
a = {1, 2, 3, 4, 4, 4, 4, 5, 6, 6}
print(a)
print(type(a))
print("#######")
b = {2, 3, 6, 7, 8}
print("a", a)
print("b", b)
print("a-b", a - b)
print("b-a", b - a)
print("a&b", a & b)
print("a|b", a | b)
print("a^b", a ^ b)

print("#######")
s = {1,2,3,4,5}
print(type(s))
print(s)
s.add(6)
print(s)
s.add(6)
print(s)
s.remove(6)
print(s)
s.clear()
print(s)
a={}
print(a)
print(type(a))

print("#######")
my_friends = {'A','C','D'}
A_friends = {'B','D','E','F'}
print(my_friends & A_friends)

f = ['Apple','Banana','Orange','Apple','Banana']
print(f)
print(type(f))
kind = set(f)
print(kind)
print(type(kind))
