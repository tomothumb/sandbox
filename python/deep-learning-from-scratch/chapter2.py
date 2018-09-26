import numpy as np

print("######")
print("AND 1")

def AND_origianl(x1, x2):
    w1, w2, theta = 0.5, 0.5, 0.7
    tmp = x1*w1 + x2*w2
    if tmp <= theta:
        return 0
    else:
        return 1

print(AND_origianl(0,0))
print(AND_origianl(1,0))
print(AND_origianl(0,1))
print(AND_origianl(1,1))

print("######")
print("AND 2")

def AND(x1, x2):
    x = np.array([x1,x2])
    w = np.array([0.5,0.5])
    bias = -0.7
    tmp = np.sum(x*w) + bias
    if tmp <= 0:
        return 0
    else:
        return 1

print(AND(0, 0))
print(AND(1, 0))
print(AND(0, 1))
print(AND(1, 1))


print("######")
print("NAND")

def NAND(x1, x2):
    x = np.array([x1,x2])
    w = np.array([-0.5,-0.5])
    bias = 0.7
    tmp = np.sum(x*w) + bias
    if tmp <= 0:
        return 0
    else:
        return 1


print(NAND(0, 0))
print(NAND(1, 0))
print(NAND(0, 1))
print(NAND(1, 1))


print("######")
print("OR")

def OR(x1, x2):
    x = np.array([x1,x2])
    w = np.array([0.5,0.5])
    bias = -0.2
    tmp = np.sum(x*w) + bias
    if tmp <= 0:
        return 0
    else:
        return 1


print(OR(0, 0))
print(OR(1, 0))
print(OR(0, 1))
print(OR(1, 1))


print("######")
print("XOR")

def XOR(x1, x2):
    s1 = NAND(x1, x2)
    s2 = OR(x1, x2)
    xor_result = AND(s1,s2)
    return xor_result


print(XOR(0, 0))
print(XOR(1, 0))
print(XOR(0, 1))
print(XOR(1, 1))

