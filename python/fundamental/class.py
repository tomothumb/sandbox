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
        print('good bye "Person Class"')


print("########")
person = Person('Mike')
person.say_something()
del person
print("########")
person2 = Person()
person2.say_something()
print("########")


class Car(object):
    def __init__(self, model=None):
        self.model = model

    def run(self):
        print('run')

    def ride(self, driver):
        driver.drive()


class ToyotaCar(Car):
    pass


class NissanCar(Car):
    def run(self):
        print('fast')


class TeslaCar(Car):
    def __init__(self, model='Model S', enable_auto_run=False, passwd='123'):
        # self.model = model
        super().__init__(model)
        self.enable_auto_run = enable_auto_run
        self.passwd = passwd

        # Priavate var
        self.__private_val = True
        self.__private_val2 = True

    # GETTER
    @property
    def private_val(self):
        return self.__private_val

    @property
    def private_val2(self):
        return self.__private_val2

    # SETTER
    @private_val2.setter
    def private_val2(self, v):
        if self.passwd == '456':
            self.__private_val2 = v
        else:
            raise ValueError


    def run(self):
        print('super fast')

    def auto_run(self):
        print('auto run')


print("########")
car = Car()
car.run()

print("########")
toyota_car = ToyotaCar('Lexus')
toyota_car.run()
print(toyota_car.model)

print("########")
nissan_car = NissanCar('Leaf')
nissan_car.run()
print(nissan_car.model)

print("########")
tesla_car = TeslaCar('Model S')
tesla_car.run()
tesla_car.auto_run()
print(tesla_car.model)
print(tesla_car.private_val)

print('tesla_car:',tesla_car.private_val2)
#tesla_car.private_val2 = False
#print('tesla_car:',tesla_car.private_val2)

print("########")

tesla_car2 = TeslaCar('Model M', passwd='456')
tesla_car2.private_val2 = False
print('tesla_car2:',tesla_car2.private_val2)

print("########")
import abc

class Driver(metaclass=abc.ABCMeta):
    def __init__(self, age=1):
        self.age = age

    #抽象メソッド
    @abc.abstractmethod
    def drive(self):
        pass

class Baby(Driver):
    def __init__(self, age=1):
        if age < 18:
            super().__init__(age)
        else:
            raise ValueError
    def drive(self):
        raise Exception("No baby drive")

class Adult(Driver):
    def __init__(self, age=18):
        if age >= 18:
            super().__init__(age)
        else:
            raise ValueError
    def drive(self):
        print('ok adult drive')


baby = Baby()
adult = Adult()
car = Car()
try:
    car.ride(baby)
except Exception:
    print('baby ride excepted.')

try:
    car.ride(adult)
except Exception:
    print('adult ride excepted.')

print("########")
# Multiple inheritance(Not recommend)

class Pen(object):
    def line(self):
        print('Pen: -----')
    def boldline(self):
        print('Pen: =====')

class Marker(object):
    def boldline(self):
        print('Marker: ■■■■■■')

class PenMarkerRobot(Marker, Pen):
    def write(self):
        print('Bot: ABC')

pen_marker_robot = PenMarkerRobot()
pen_marker_robot.line()
pen_marker_robot.boldline()
pen_marker_robot.write()

print("########")
# class vars
class Man(object):
    kind = 'human'

    def __init__(self, name):
        self.name = name

    def who_are_you(self):
        print(self.name, self.kind)

a = Man('A')
a.who_are_you()
b = Man('B')
b.who_are_you()


class Words(object):

    # this vars will be shared within instances
    words = []

    def __init__(self):
        # this self vars will not be shared within instances
        self.localwords = []

    def add_word(self,word):
        self.words.append(word)
        self.localwords.append(word)

w = Words()
w.add_word('add 1')
w.add_word('add 2')

w2 = Words()
w2.add_word('add 3')
w2.add_word('add 4')

print('w.words: ',w.words)
print('w.localwords: ',w.localwords)
print('w2.words: ',w2.words)
print('w2.localwords: ',w2.localwords)


print("########")
# class method / static method

class Woman(object):
    kind = 'human'
    def __init__(self):
        self.x = 100

    @classmethod
    def what_is_your_kind(self):
        return self.kind

    @staticmethod
    def about(year):
        print('about human {}'.format(year))

a = Woman()
print(a)
print(a.x)
print(a.kind)
print(a.what_is_your_kind())
b = Woman
print(b)
# print(b.x) # Error
print('b.kind:', b.kind)
print('b.what_is_your_kind:', b.what_is_your_kind())
print('Woman.kind:',Woman.kind)
print('Woman.what_is_your_kind:',Woman.what_is_your_kind())
Woman.about(1000)

