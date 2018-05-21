# sandbox
A daily weekly monthly yearly something


## Config

### CLI Editor setting

```
$ vi ~/.bashrc
---
### .bashrc ###
export EDITOR=vim

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
