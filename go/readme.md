# Boot

## Enviroment

- $GOPATH
- $GOROOT
- 依存管理: dep を使う


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