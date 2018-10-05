import sys

print(1)
print(sys.argv)

for i in sys.argv:
    print(i)


print("########")
# Sub Process

import subprocess
subprocess.run(['ls'])
print("###")
subprocess.run(['ls','-al'])
print("###")
subprocess.run('ls -al', shell=True)
print("###")

print("###")
#PIPE
subprocess.run('ls -al | grep test', shell=True) # Don't use Worning
print("#")
p1 = subprocess.Popen(['ls', '-al'], stdout=subprocess.PIPE)
p2 = subprocess.Popen(['grep', 'test'], stdin=p1.stdout, stdout=subprocess.PIPE)
p1.stdout.close()
output = p2.communicate()[0]
print(output)