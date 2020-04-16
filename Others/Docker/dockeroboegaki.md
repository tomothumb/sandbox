バージョン
docker version

システムの情報
docker system info

容量の確認
docker system df
容量の詳細
docker system df -v


https://hub.docker.com/_/nginx/
docker pull nginx
docker image pull centos:7
# 特定のURLからイメージ取得（例：https://gcr.io/tensorflow/tensorflow）
docker image pull gcr.io/tensorflow/tensorflow
docker image ls
docker image ls -a

docker image inspect centos:7

docker image tag nginx hoge/fuga:1.0

docker image rm nginx
docker image rm a1s2d3fd4f4g5


docker container create aaaaaa
docker container run aaaaaa
docker container start aaaaaa
docker container stop aaaaaa
docker container rm aaaaaa
docker container pause aaaaaa
docker container ps aaaaaa

// シェルを開く
docker container run -it --name "test1" aaaaaa /bin/bash
// バックグラウンドで実行
docker container run -d centos /bin/ping localhost
	// centosイメージを元にコンテナを生成し、localhostに対して、pingをバックグラウンドで実行する。
$ docker exec -i -t コンテナ名 bash


//ログ
docker container logs -t a1s2d3f4g5

## 起動と停止
docker container run --name webserver -d -p 80:80 nginx

docker start webserver
docker stop webserver

## 確認
docker container ps
docker container stats

docker container ls
docker container ls -a
docker container ls -a -s
docker container ls -a -f name=laradock

--
docker system info
Containers: 21
 Running: 1
 Paused: 0
 Stopped: 20
Images: 922

--
docker system df
TYPE                TOTAL               ACTIVE              SIZE                RECLAIMABLE
Images              36                  11                  6.368GB             5.077GB (79%)
Containers          21                  1                   38.01MB             38.01MB (99%)
Local Volumes       81                  5                   5.666MB             4.899MB (86%)
Build Cache         0                   0                   0B                  0B

