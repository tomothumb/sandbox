from sample_package.tools import utils

def sing():
    return '##sdfasdfdasfasd##'

def cry():
    return utils.say_twice('#asdfasdfasdf##')


if __name__ == '__main__':
    print(sing())
    print('animal:', __name__)