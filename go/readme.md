# Boot


## goenv

```
$ anyenv update
$ anyenv install goenv
$ goenv install -l
$ goenv install 1.10.2
$ goenv global 1.10.2
$ goenv rehash

---
### .bash_profile ###
export PATH="$HOME/.anyenv/envs/goenv/bin:$PATH"
eval "$(goenv init -)"

export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
---
```



## Dep インストール

公式(予定)の依存管理ツール

```
$ brew install dep
$ cd {product_dir}
$ dep init
$ dep ensure
```



## direnv インストール

プロジェクトディレクトリ別に環境変数を切り替えるためのもの。

参照
https://qiita.com/keitaMatsuo/items/466c6eabac4538d9de71

```
$ brew install direnv
$ echo 'eval "$(direnv hook bash)"' >> ~/.bash_profile

$ cd {project_dir}
$ direnv edit .
---
### {project_dir}/.envrc ###
export GOBIN=$(pwd)/bin
export GOPATH=$(pwd):$GOPATH
export PATH=$PATH:$GOBIN
---

$ direnv allow
$ direnv reload

```

## How to Build

```
$ cd {PROJECTDIR}
$ dep init
$ dep ensure

// 実行
$ go run

// ビルド
$ go build {SRC_DIR}/{FILE_NAME}.go
// ビルドしたものを実行
$ ./{BUILD_FILE}
```
