import collections
import os
import sys

import termcolor

import sample_package
import sample_package.talk.animal

import imported_sample

print("#######")

print(collections.__file__)
print(termcolor.__file__)
print(sample_package.__file__)
print(imported_sample.__file__)
print("#######")
print(sys.path)

print("#######")
print('import parent:',__name__)
print("#######")

def main():
    print( sample_package.talk.animal.sing() )


if __name__ == '__main__':
    main()

# print('import parent animal sing :',__name__)
