# GUI
## QT

### インストール
```
$ brew install qt5
$ vim ~/.bash_profile
$ source ~/.bash_profile
---
### .bash_profile ###
export QT_HOMEBREW=true
---

$ go get -u -v github.com/therecipe/qt/cmd/...
$ $GOBIN/qtsetup

```

### depでQTビルドできない
https://github.com/golang/dep/issues/269

https://github.com/therecipe/qt/wiki/Installation
https://www.qt.io/download
https://tyablog.net/2018/02/03/go-qt-setup-for-macosx/
https://github.com/therecipe/qt/issues/284