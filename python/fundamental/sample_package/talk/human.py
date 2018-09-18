# way1 absolute path (recommend)
from sample_package.tools import utils
# way2 relative path
# from ..tools import utils

def sing():
    return 'sing'

def cry():
    return utils.say_twice('cry')
