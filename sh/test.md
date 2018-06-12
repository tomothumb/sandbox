# 文字列操作

## sed
```
# カンマ区切りからタブ区切りに変換
$ cat sample.csv | awk -F, ' BEGIN { OFS = "\t" } { print($1, $2) }' > sample.csv
```

## awk

## cut
```
#スペースからタブに変換
$ cat sample.txt | tr ' ' '\t'
```
