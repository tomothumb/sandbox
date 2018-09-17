print('########')


def say_something():
    s = 'hi'
    return s


print('########')

say_something()
f = say_something
print(type(say_something))
print(type(f))
f()

print('########')

result = say_something()
print(result)

print('########')


def what_is_this(color):
    if color == 'red':
        return 'tomato'
    elif color == 'green':
        return 'green pepper'
    else:
        return "I don't know"


result = what_is_this('red')
print(result)
result = what_is_this('green')
print(result)
result = what_is_this('yellow')
print(result)

print('########')


# num: int = 10
def add_num(a: int, b: int) -> int:
    return a + b


r = add_num(1, 2)
print(r)
r = add_num('aaa', 'bbbb')
print(r)

print('########')


def menu(entree='def1', drink='def2', dessert='def3'):
    print('entree = ', entree)
    print('drink = ', drink)
    print('dessert = ', dessert)


menu(entree='beef', dessert='ice', drink='beer')
print('########')
menu('beer', dessert='ice', drink='beer')
print('########')
menu()
print('########')
menu(entree='chicken')
print('########')
menu('chicken', drink='beer')

print('########')


def test_func(x, l=[]):  # バグにつながる可能性
    l.append(x)
    return l


y = [1, 2, 3]
r = test_func(100, y)
print(r)

y = [1, 2, 3]
r = test_func(200, y)
print(r)
print('########')

r = test_func(100)
print(r)

r = test_func(100)  # バグにつながる可能性
print(r)

print('########')


# バグ解決版。Noneを指定してNoneの場合にデフォルトを指定する

def test_func(x, l=None):
    if l is None:
        l = []
    l.append(x)
    return l


print('########')
r = test_func(100)
print(r)

r = test_func(100)
print(r)

print('########')


def say_something(word, word2, word3):
    print(word, word2, word3)


r = say_something('Hi!', 'Mike', 'Nance')
print('########')


def say_something(word, *args):
    for arg in args:
        print(arg)
    print("word  : ", word)


print('########')
r = say_something('Hi!', 'Mike', 'Nance')
print('########')
t = ('Mike', 'Nancy')
r = say_something('Hi!', *t)

print('########')


def menu(entree='beef', drink='wine'):
    print(entree, drink)


menu(entree='beef', drink='coffee')


def menu(**kwargs):
    print(kwargs)
    for k, v in kwargs.items():
        print(k, v)


menu(entree='beef', drink='coffee')

d = {
    'entree': 'beef',
    'drink': 'ice coffee',
    'dessert': 'ice'
}
menu(**d)

print('########')


def menu2(food, *args, **kwargs):
    print(food)
    print(args)
    print(kwargs)


menu2('banana', 'apple', 'orange', entree='beef', drink='coffee')

print('########')


def example_func(param1, param2):
    """
    demodemodemo

    :param param1:
    :param param2:
    :return:
    """

    print(param1)
    print(param2)
    return True


print(example_func.__doc__)
help(example_func)

print('########')


def outer(a, b):
    print(a, b)

    def plus(c, d):
        return c + d

    r1 = plus(a, b)
    r2 = plus(b, a)
    print(r1 + r2)


outer(1, 2)

print('########')


# closure
def outer(a, b):
    def inner():
        return a + b

    return inner


f = outer(1, 2)
r = f()
print(r)

print('########')


# closure example
def circle_area_func(pi):
    def circle_area(radius):
        return pi * radius * radius

    return circle_area


ca1 = circle_area_func(3.14)
ca2 = circle_area_func(3)
ca3 = circle_area_func(3.1415)

print(ca1(10))
print(ca2(10))
print(ca3(10))

print('########')


# decorator
def add_num(a, b):
    return a + b


print('start')
r = add_num(10, 20)
print('edn')
print(r)

print('#####')


def print_info(func):
    def wrapper(*args, **kwargs):
        print('start')
        result = func(*args, **kwargs)
        print('end')
        return result

    return wrapper


def print_more(func):
    def wrapper(*args, **kwargs):
        print('func:', func.__name__)
        print('args:', args)
        print('kwargs:', kwargs)
        result = func(*args, **kwargs)
        print('result:', result)
        print('end')
        return result

    return wrapper


f = print_info(add_num)
r = f(10, 20)
print(r)

print('#####')


@print_info
def sub_num(a, b):
    return a - b


@print_info
@print_more
def multi_num(a, b):
    return a * b


@print_more
@print_info
def divide_num(a, b):
    return a % b


r = sub_num(10, 20)
print(r)
print('#####')
r = multi_num(10, 20)
print(r)
print('#####')
r = divide_num(10, 20)
print(r)

print('########')
# lambda
l = ['Mon', 'tue', 'Wed', 'Thu', 'fri', 'sat', 'Sun']


def change_words(words, func):
    for word in words:
        print(func(word))


# def sample_func(word):
#     return word.capitalize()
# def sample_func2(word):
#     return word.lower()

sample_func = lambda word: word.capitalize()

change_words(l, sample_func)
change_words(l, lambda word: word.capitalize())
change_words(l, lambda word: word.lower())
