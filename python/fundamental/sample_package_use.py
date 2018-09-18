# How to 1
import sample_package.tools.utils

r = sample_package.tools.utils.say_twice('hello')
print(r)

# How to 2
try:
    from sample_package import utils
except ImportError:
    from sample_package.tools import utils

r = utils.say_twice('hello2')
print(r)

# How to 3
from sample_package.tools.utils import say_twice

r = say_twice('hello3')
print(r)

# How to 4
from sample_package.tools import utils as u

r = u.say_twice('hello4')
print(r)

# print("######")
# from sample_package.talk import human
# r = utils.say_twice('hello')
# print(r)
# print(human.sing())
# print(human.cry())

# print("######")
# from sample_package.talk import animal
# print(animal.sing())
# print(animal.cry())

print("######")
# __init__.pyの__all__=['xxxx','yyyy']
# not recommend use "*"
from sample_package.talk import *

print(human.sing())
print(human.cry())
print(animal.sing())
print(animal.cry())
