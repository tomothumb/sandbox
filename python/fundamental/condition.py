print('########')
# IF / elif / else

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
# and / or
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

print('########')

y = [1, 2, 3]
x = 1

if x in y:
    print('in')
if 100 not in y:
    print('not in')

a = 1
b = 2

if not a == b:
    print('Not equal')
if a != b:
    print('Not equal')

print('########')
is_ok = True
is_ng = False
if is_ok:
    print('hello is_ok')
if not is_ng:
    print('hello is_ng')

print('########')
is_ok = 1
if is_ok:
    print('OK 1')
else:
    print('NG 1')

is_ok = 0
if is_ok:
    print('OK 0')
else:
    print('NG 0')

is_ok = ''
if is_ok:
    print('OK ""')
else:
    print('NG ""')

is_ok = 'abc'
if is_ok:
    print('OK "abc"')
else:
    print('NG "abc"')

is_ok = ''
if is_ok:
    print('OK ""')
else:
    print('NG ""')

is_ok = []
if is_ok:
    print('OK []')
else:
    print('NG []')

is_ok = [1, 2, 3]
if is_ok:
    print('OK [1,2,3]')
else:
    print('NG [1,2,3]')

is_ok = {}
if is_ok:
    print('OK {}')
else:
    print('NG {}')

is_ok = ()
if is_ok:
    print('OK ()')
else:
    print('NG ()')

print('########')

is_empty = None
if is_empty:
    print('OK None')
else:
    print('NG None')

if is_empty == None:
    print('OK is_empty == None')
else:
    print('NG is_empty == None')

if is_empty is None:
    print('OK is_empty is None')
else:
    print('NG is_empty is None')
if is_empty is not None:
    print('OK is_empty is not None')
else:
    print('NG is_empty is not None')

if 1 == True:
    print('OK 1 == True')
else:
    print('NG 1 == True')

if 1 == True:
    print('OK 1 == True')
else:
    print('NG 1 == True')

if 1 is True:
    print('OK 1 is True')
else:
    print('NG 1 is True')

if True is True:
    print('OK True is True')
else:
    print('NG True is True')
