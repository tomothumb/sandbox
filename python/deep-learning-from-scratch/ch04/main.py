import numpy as np
import matplotlib.pylab as plt

print("######")


def mean_squared_error(y, t):
    return 0.5 * np.sum((y - t) ** 2)


def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)

    batch_size = y.shape[0]
    delta = 1e-7
    # return -np.sum(t * np.log(y + delta)) / batch_size
    return -np.sum(np.log(y[np.arange(batch_size), t] + delta)) / batch_size


t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
y1 = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0]
y2 = [0.1, 0.05, 0.1, 0.0, 0.05, 0.1, 0.0, 0.6, 0.0, 0.0]
print(mean_squared_error(np.array(y1), np.array(t)))
print(mean_squared_error(np.array(y2), np.array(t)))

print("######")
print(cross_entropy_error(np.array(y1), np.array(t)))
print(cross_entropy_error(np.array(y2), np.array(t)))

print("######")


def numerical_diff(f, x):
    # h = 10e-50 # => 0.000 error
    # return (f(x+h) - f(x)) / h
    h = 10e-4  # => 0.0001
    return (f(x + h) - f(x - h)) / (h*2)


def fn_example1(x):
    return 0.01*x**2 + 0.1*x


x = np.arange(0.0,20.0,0.1)
y = fn_example1(x)
plt.xlabel("x")
plt.ylabel("f(x)")
plt.plot(x,y)
plt.show()

print(numerical_diff(fn_example1, 5))
print(numerical_diff(fn_example1, 10))
print("######")

def tangent_line(f, x):
    d = numerical_diff(f, x)
    print(d)
    y = f(x) - d * x
    return lambda t: d * t + y

tf2 = tangent_line(fn_example1, 5)
tf3 = tangent_line(fn_example1, 10)
y2 = tf2(x)
y3 = tf3(x)

plt.plot(x, y)
plt.plot(x, y2)
plt.plot(x, y3)
plt.show()
