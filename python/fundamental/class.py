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


class ToyotaCar(Car):
    pass


class NissanCar(Car):
    def run(self):
        print('fast')


class TeslaCar(Car):
    def __init__(self, model='Model S', enable_auto_run=False):
        # self.model = model
        super().__init__(model)
        self.enable_auto_run = enable_auto_run
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
