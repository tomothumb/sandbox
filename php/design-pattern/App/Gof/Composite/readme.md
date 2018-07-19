# Compositeパターン

共通のインターフェースを実装することで、異なる要素を同一視する。


```
interface ComponentInterface{
    public function showName($prefix);
}

class File extends Component
{
    public function showName($prefix){
        ... 処理 ...
    }
}
class Dir extends Component
{
    public function showName($prefix){
        ... 処理 ...
    }
}
```
