# User Management

## グループ
### 確認
```
グループ一覧
$ cat /etc/group
=>
user1:x:501:
nginx:x:499:user1

ユーザ名:パスワード:グループID(GID):所属メンバー
```

### 確認
```
それぞれ確認
groupadd
groupmod
groupdel

```

## ユーザ
### ユーザ確認
```
グループ一覧
$ cat /etc/passwd
$ less /etc/passwd
=>
nginx:x:498:499:nginx user:/var/cache/nginx:/sbin/nologin

ユーザ名:パスワード:ユーザID:グループID:コメント:ディレクトリ:シェル
```

### グループ
```
ユーザ所属しているグループ一覧を表示
$ id ユーザ名
$ groups ユーザ名

```

