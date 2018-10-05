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

print("########")
# Template

import string
s = """\
Hi $name.
$contents.
Have a good day.
"""

tpl = string.Template(s)
contents = tpl.substitute(name='Mike', contents= 'How are you?')
print(contents)

print("########")
with open('file_test_design.txt') as f:
    t = string.Template(f.read())
contents = tpl.substitute(name='Mike', contents= 'How are you?')
print(contents)


print("########")
# CSV

import csv

with open('file_test_csv.csv', 'w') as csv_file:
    fieldnames = ['Name','Count']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerow({'Name':'A','Count':1})
    writer.writerow({'Name':'B1\nB2','Count':2})

with open('file_test_csv.csv','r') as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        print(row['Name'], row['Count'])

print("########")
# File

import os
import pathlib
import glob
import shutil

print(os.path.exists('file_test.txt'))
print(os.path.isfile('file_test.txt'))
print(os.path.isdir('file_test.txt'))
print(os.path.isdir('sample_package'))

os.rename('file_test.txt','file_test_renamed.txt')
#os.symlink('file_test_renamed.txt','file_test_symlink.txt')

if os.path.exists('file_test_empty.txt'):
    os.remove('file_test_empty.txt')
else:
    pathlib.Path('file_test_empty.txt').touch()


if os.path.exists('file_test_dir'):
    # os.rmdir('file_test_dir')
    shutil.rmtree('file_test_dir') # warning to exec.
else:
    os.mkdir('file_test_dir')
    os.mkdir('file_test_dir/subdir1')
    os.mkdir('file_test_dir/subdir2')
    os.mkdir('file_test_dir/subdir2/subdir2-2')
    pathlib.Path('file_test_dir/subdir2/empty.txt').touch()
    shutil.copy('file_test_dir/subdir2/empty.txt',
                'file_test_dir/subdir2/empty2.txt')
    os.mkdir('file_test_dir/subdir3')
    # get list
    print(os.listdir('file_test_dir'))
    # get list
    print(glob.glob('file_test_dir/subdir2/*'))

print(os.getcwd())


print("########")
# Tar/gz
import tarfile

with tarfile.open('file_test_tar.gz','w:gz') as tr:
    tr.add('file_test_tar')

with tarfile.open('file_test_tar.gz','r:gz') as tr:
    tr.extractall(path='file_test_tar_open')

with tarfile.open('file_test_tar.gz','r:gz') as tr:
    with tr.extractfile('file_test_tar/test2.txt') as f:
        print(f.read())

print("########")
# Zip
import zipfile

with zipfile.ZipFile('file_test_zip.zip','w') as z:
    # z.write('file_test_zip')
    # z.write('file_test_zip/test.txt')
    for f in glob.glob('file_test_zip/**', recursive=True):
        print(f)
        z.write(f)

with zipfile.ZipFile('file_test_zip.zip','r') as z:
    z.extractall('file_test_zip_open')
    with z.open('file_test_zip/test2.txt') as f:
        print(f.read())