import os

import numpy as np

x = np.array([1.0,2.0,3.0])
y = np.array([4.0,5.0,6.0])
type(x)
print('x',x)
print('y',y)

print('x+y',x+y)
print('x-y',x-y)
print('x*y',x*y)
print('x/y',x/y)

print('x/2',x/2)

print("######")
x = np.array([[1,2],[3,4]])
y = np.array([[3,0],[0,3]])
print('x',x)
print('y',y)
print(type(x))
print(x.shape)
print(x.dtype)

print('x+y',x+y)
print('x-y',x-y)
print('x*y',x*y)
print('y/x',y/x)

print('x*10',x*10)

print("######")
x = np.array([[1,2],[3,4]])
y = np.array([10,20])
print('x',x)
print('y',y)
print(type(x*y))
print('x*y',x*y)

x_flat = x.flatten()
print("x.flatten",x_flat)
print(x_flat[np.array([0,2])])
print("######")
print('y',y)
print('y>15',y>15)
print('y[y>15]',y[y>15])

print("######")
# graph
import matplotlib.pyplot as plt

x = np.arange(start=0,stop=6,step=0.1)
print('np.arange(start=0,stop=6,step=0.1)',x)
y1 = np.sin(x)
y2 = np.cos(x)
y3 = np.tan(x)
print('np.sin(x)',y)
plt.plot(x,y1, label='sin')
plt.plot(x,y2, label='cos')
plt.xlabel('x')
plt.ylabel('y')
plt.title('sin & cos')
plt.legend()
plt.show()


print("######")
# Image
import matplotlib.pyplot as plt2
from matplotlib.image import imread
img = imread(os.path.dirname(__file__) + '/assets/img/demo.png')
plt2.imshow(img)
plt2.show()