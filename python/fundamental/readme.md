
Official Lib:
https://docs.python.jp/3/library/collections.html

PyPI:
https://pypi.org/

```
$ pip install termcolor
```

## importing order

- importing order should be A-Z ordering.
- - Standard Lib
  - 3rd-party Package
  - Own Package
  - Local Package

```
# Standard Lib
import collections
import os
import sys

# 3rd-party Lib
import aaa
import termcolor

# Own Lib
import sample_package

# Local Package
import note

```

## Librery

### Coding style
```
#pip install pep8
pip install pycodestyle
pip install flake8
pip install pylint
```