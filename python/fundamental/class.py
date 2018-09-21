class Person(object):
    # constructor
    def __init__(self, name='TARO'):
        self.name = name
        print('First')

    def say_something(self):
        print('I am {} hello'.format(self.name))
        self.run(10)

    def run(self, num):
        print('run ' * 10)

    # destructor
    def __del__(self):
        print('good bye')


print("########")
person = Person('Mike')
person.say_something()
del person
print("########")
person2 = Person()
person2.say_something()
print("########")
