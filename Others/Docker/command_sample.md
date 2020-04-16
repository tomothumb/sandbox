# Command Samples

## Delete container コンテナを削除
```
docker ps -a
docker rm <コンテナ名 or コンテナID>
```

## Delete image イメージを削除
```
docker images
docker rmi <イメージ名、またはイメージID>
```

## Build ビルド
```
$ docker build -t <コンテナに設定するタグラベル> ＜パス＞
$ docker build -t hello_world .
$ docker build -f <Dockerfile名> -t <コンテナ名称> ＜パス＞
$ docker build -f Dockerfile.golang -t hello-golang .

```
## Run 実行
```
docker build -t <名称> ＜パス＞
ex.
$ docker run -it <Dockerイメージタグ名>
$ docker run -rm -it <Dockerイメージタグ名>
$ docker run -rm -it -p <ポート:ポート> <Dockerイメージタグ名>
$ docker run -rm -it -p 8080:8080 <Dockerイメージタグ名>
    -rm：停止時にコンテナ削除
    -p <ポート番号>：
    -it:コンテナ内に入る
    -v:ボリューム
$ docker run -it -p <ポート:ポート> -v <ディレクトリ>:<ディレクトリ> <コンテナ名>
# $ docker run -it -p 8080:8080 -v ~/path_src_dir:/go/src/app hello

```

# イメージ`<none>:<none>`をけす
```
docker rmi $(docker images -f 'dangling=true' -q)
docker image prune
```


ーーーーーーーーーーーーーーーーー

