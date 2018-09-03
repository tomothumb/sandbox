
l = [1,2,3,4,60,3]
print(l)
print(l[0])
print(l[4])
print(l[-3])

print(l[2:5])
print(l[:2])
print(l[2:])
print(l[:])

print(len(l))
print(type(l))
print("#####")
print(list("abcdefg"))
print("#####")
print("#####")

l2 = [1,2,3,4,5,6,7,8,9,10]
print(l2[::2])
print(l2[::3])
print(l2[::-1])

print("#####")

str_list = ['a','b','c','d','e']
num_list = [1,2,3]
combined_list = [str_list,num_list]
print(combined_list)
print(combined_list[0])
print(combined_list[0][1])
print(combined_list[1][2])
print("#####")
str_list[0] = "AAA"
str_list[1:3] =  ['CC','DD','EE']
print(str_list)
str_list[1:3] =  []
print(str_list)
str_list[:] =  []
print(str_list)
print("#####")

num_list = [1,2,3,4,5,6,7,8,9,10]
print(num_list)
num_list.insert(0, 200)
print(num_list)
num_list.insert(3, 300)
print(num_list)
pop = num_list.pop()
print(num_list,pop)
pop = num_list.pop(0)
print(num_list,pop)
pop = num_list.pop(5)
print(num_list,pop)
print("#####")
del num_list[0]
print(num_list)
del num_list[5]
print(num_list)
print("#####")
num_list = [1,3,3,3,10]
print(num_list)
num_list.remove(3)
print(num_list)
num_list.remove(3)
print(num_list)
num_list.remove(3)
print(num_list)
print("#####")
num_list1 = [1,1,1]
num_list2 = [2,3,4]
sum_num_list = num_list1 + num_list2
print(sum_num_list)
print(num_list1)
print(num_list2)
num_list1 += num_list2
print(num_list1)

num_list3 = [9,9,9]
num_list4 = [2,3,4]
print(num_list3)
print(num_list4)
num_list3.extend(num_list4)
print(num_list3)

print("#####")
