# Write
f = open('file_test.txt', 'w')
f.write('Test\n')
print('My', 'name', 'is', 'Mike', sep='#', end='!\n', file=f)
# f.write()
f.close()

print("########")
# Write and Read
with open('file_test.txt', 'w+') as myfile_wplus:
    # file will be empty after open with "w+".
    myfile_wplus.write('w+open\n')
    myfile_wplus.seek(0)
    print(myfile_wplus.read())

print("########")
# Append
f = open('file_test.txt', 'a')
f.write('Test\n')
f.close()

print("########")
# with statement
with open('file_test.txt', 'a') as myfile:
    myfile.write('with open write\n')
    print('My', 'name', 'is', 'Mike', sep='_', end='!\n', file=myfile)

print("########")
# Read
with open('file_test.txt', 'r') as myfile_all:
    print("myfile_all")
    print(myfile_all.read())

print("########")
with open('file_test.txt', 'r') as myfile_line:
    print("myfile_line")
    while True:
        line = myfile_line.readline()
        print(line, end='')
        if not line:
            break

print("########")
with open('file_test.txt', 'r') as myfile_chunk:
    print("myfile_chunk")
    while True:
        chunk = 2
        s = myfile_chunk.read(chunk)
        print(s, end='|')
        if not s:
            break

print("########")
# Seek
with open('file_test.txt', 'r') as myfile_seek:
    print(myfile_seek.tell())
    print(myfile_seek.read(3))
    myfile_seek.seek(5)
    print(myfile_seek.tell())
    print(myfile_seek.read(3))
    print(myfile_seek.tell())
    myfile_seek.seek(14)
    print(myfile_seek.tell())
    print(myfile_seek.read(3))
    myfile_seek.seek(999)
    print(myfile_seek.read(3))
    myfile_seek.seek(5)
    print(myfile_seek.read(3))


print("########")
# Write and Read
with open('file_test.txt', 'r+') as myfile_rplus:
    print(myfile_rplus.read())
    myfile_rplus.write('r+open\n')
    myfile_rplus.seek(0)
    print(myfile_rplus.read())
