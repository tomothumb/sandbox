print('hello. \nHow are you?')
print('C:\name\name')
print(r'C:\name\name')

print("#########")
print("""\
line1
line2
line3\
""")
print("#########")

print("Hi. " * 3 + "Mike.")

print("Hi. " * 3)

word = 'python'
print(word[0])
print(word[1])
print(word[-1])
print(word[0:2])
print(word[1:3])
print("#########")
print(word[:2])
print("#########")
print(word[1:])
print("#########")
word = "j" + word[1:]
print(word)
print(word[:])
print("#########")
word_length = len(word)
print(word_length)

print("#########")
s = 'my name is Mike. Hi Mike.'
print(s)
is_start = s.startswith('My')
print(is_start)
is_start = s.startswith('X')
print(is_start)
print("#########")
print(s.find('Mike'))
print(s.find('AAAAA'))
print("#########")
print(s.rfind('Mike'))
print(s.count('Mike'))
print("#########")
print(s.capitalize())
print(s.title())
print(s.upper())
print(s.lower())
print("#########")
print(s.replace('Mike','Nancy'))


print( 'a is {}'.format('a') )
print( 'a is {}'.format('test') )
print( 'a is {} {} {}'.format(1,2,3) )
print( 'a is {0} {1} {2}'.format(1,2,3) )
print( 'a is {1} {0} {2}'.format(1,2,3) )
print( 'My name {0} {1}'.format('AAA', 'BBB') )
print( 'My name {0} {1}. Watashi ha {1} {0}.'.format('AAA', 'BBB') )
print( 'My name {name} {family}. Watashi ha {family} {name}.'.format(name='AAA', family='BBB') )

print(1, type(1))
print(str(1), type(str(1)) )
print(3.14, type(3.14) )
print(3.14, type(str(3.14)) )
print(True, type(True) )
print(True, type(str(True)) )

# ??
# print(True, type(int(True)) )
# ??
# print(False, type(int(False)) )





