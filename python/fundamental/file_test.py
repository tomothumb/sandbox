# Write
f = open('file_test.txt','w')
f.write('Test\n')
print('My','name','is', 'Mike', sep='#', end='!\n', file=f)
# f.write()
f.close()

print("########")
# Append
f = open('file_test.txt','a')
f.write('Test\n')
f.close()

print("########")
# with statement
with open('file_test.txt','a') as myfile:
    myfile.write('with open write\n')
    print('My','name','is', 'Mike', sep='_', end='!\n', file=myfile)

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
