
# IF

x = 0
if x < 0:
    print('negative')
elif x == 0:
    print('zero')
elif x == 10:
    print('ten')
else:
    print('positive')

print('########')

a = 5
b = -1
if a > 0:
    print('a is positive')
    if b > 0:
        print('b is positive')
    else:
        print('b is negative')

if a > 1 and b > 1:
    print('a and b are bigger than 1')
else:
    print('a and b are not bigger than 1')

if a > 1 or b > 1:
    print('either a or b is bigger than 1')
else:
    print('a and b is smaller than 1')

# Debugger
