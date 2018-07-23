# Virtualbox Note
## Shared between host and client
```
$ mount -r -t iso9660 /dev/sr1 /media/vboxx_guest_addition
$ cd /media/vboxx_guest_addition
$ ./VBoxLinuxxAdditions.run
$ shutdown -h now

#共有フォルダはvboxsfグループになるためApacheユーザをvboxsfに含める
$ ln -s /media/SHARED_DIR/SOMETHING /var/www/html
$ gpasswd -a apache vboxsf

#SELinux off
$ setenforce 0
$ vi /etc/selinux/cofig

$ systemctl start httpd.service
$ sysetmctl status httpd.service
```