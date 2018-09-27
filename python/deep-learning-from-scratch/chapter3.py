import numpy as np
import matplotlib.pylab as plt

print("######")


# step
def step_function(x):
    # x : numpy.ndarray
    return np.array(x > 0, dtype=np.int)


x = np.arange(-5, 5, 0.1)
y = step_function(x)
print(type(x), x, y)

plt.plot(x, y)
plt.ylim(-0.1, 1.1)  # range of y axis on fig.
plt.show()

print("######")


# sigmoid

def sigmoid(x):
    return 1 / (1 + np.exp(-x))


x = np.arange(-10, 10, 0.1)
# x = np.array([-1,1,2])
y = sigmoid(x)
y2 = step_function(x)
print(x, y, y2)

plt.plot(x, y)
plt.ylim(-0.1, 1.1)  # range of y axis on fig.
plt.show()

print("######")


# ReLU

def relu(x):
    return np.maximum(0, x)


x = np.arange(-5, 5, 0.1)
y = relu(x)
print(x, y)

plt.plot(x, y)
plt.ylim(-0.1, 10)  # range of y axis on fig.
plt.show()

print("######")
A = np.array([1, 2, 3, 4])
print(A, np.ndim(A), A.shape)
B = np.array([[1, 2], [3, 4], [5, 6]])
print(B, np.ndim(B), B.shape)

print("###")
C1 = np.array([[1, 2], [3, 4]])
C2 = np.array([[5, 6], [7, 8]])
C1C2 = np.dot(C1, C2)
print("C1", C1, "shape", C1.shape)
print("C2", C2, "shape", C2.shape)
print("C1*C2:", C1 * C2, "shape", (C1 * C2).shape)
print("C1C2:", C1C2, "shape", C1C2.shape)

print("###")
D1 = np.array([[1, 2, 3], [4, 5, 6]])
D2 = np.array([[1, 2], [3, 4], [5, 6]])
D1D2 = np.dot(D1, D2)
print("D1", D1, "shape", D1.shape)
print("D2", D2, "shape", D2.shape)
# print("D1*D2:",D1*D2,"shape",(D1*D2).shape ) # error
print("D1D2:", D1D2, "shape", D1D2.shape)

print("######")
x = np.array([1, 2])
w = np.array([[1, 3, 5], [2, 4, 6]])
print("x", x, 'x.shape', x.shape)
print("w", w, 'w.shape', w.shape)
y = np.dot(x, w)
print('y', y)

print("######")
x = np.array([1.0, 0.5])
w1 = np.array([[0.1, 0.3, 0.5], [0.2, 0.4, 0.6]])
b1 = np.array([0.1, 0.2, 0.3])
a1 = np.dot(x, w1) + b1
print("x", x, 'x.shape', x.shape)
print("w1", w1, 'w1.shape', w1.shape)
print("b1", b1, 'b1.shape', b1.shape)
print('a1', a1, 'a1.shape', a1.shape)
z1 = sigmoid(a1)
print('z1', z1, 'z1.shape', z1.shape)

w2 = np.array([[0.1, 0.4], [0.2, 0.5], [0.3, 0.6]])
b2 = np.array([0.1, 0.2])
a2 = np.dot(z1, w2) + b2
print("w2", w2, 'w2.shape', w2.shape)
print("b2", b2, 'b2.shape', b2.shape)
print('a2', a2, 'a2.shape', a2.shape)
z2 = sigmoid(a2)
print('z2', z2, 'z2.shape', z2.shape)


def identify_function(x):
    return x


w3 = np.array([[0.1, 0.3], [0.2, 0.4]])
b3 = np.array([0.1, 0.2])
a3 = np.dot(z2, w3) + b3
print("w3", w3, 'w3.shape', w3.shape)
print("b3", b3, 'b3.shape', b3.shape)
print('a3', a3, 'a3.shape', a3.shape)
y = identify_function(a3)
print('y', y, 'y.shape', y.shape)

print("######")


# Newral network ( foward)

def init_network():
    network = {}

    network['W1'] = np.array([[0.1, 0.3, 0.5], [0.2, 0.4, 0.6]])
    network['b1'] = np.array([0.1, 0.2, 0.3])

    network['W2'] = np.array([[0.1, 0.4], [0.2, 0.5], [0.3, 0.6]])
    network['b2'] = np.array([0.1, 0.2])

    network['W3'] = np.array([[0.1, 0.3], [0.2, 0.4]])
    network['b3'] = np.array([0.1, 0.2])

    return network


def forward(network, x):
    W1, W2, W3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']

    a1 = np.dot(x, W1) + b1
    z1 = sigmoid(a1)
    a2 = np.dot(z1, W2) + b2
    z2 = sigmoid(a2)
    a3 = np.dot(z2, W3) + b3
    y = identify_function(a3)
    return y


network = init_network()
x = np.array([1.0, 0.5])
y = forward(network, x)
print(y)

print("######")


# Softmax
def softmax(a):
    c = np.max(a)
    exp_a = np.exp(a - c)
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y


x = np.array([0.3, 2.9, 4.0])
y = softmax(x)
print(y)
print(np.sum(y))
print("###")
x = np.array([1010, 1000, 990])
y = softmax(x)
# y = np.exp(x) / np.sum(np.exp(x)) # [nan nan nan] Overflow Error
print(y)
print(np.sum(y))