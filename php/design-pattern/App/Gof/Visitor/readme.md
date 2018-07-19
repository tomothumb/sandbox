# Visitorパターン

要素と処理とを分ける。

ファイルとディレクトリの要素があったとして、
PHPではメソッドオーバーライドができないので、次のように記述できない。

```
interface ProcessorVisitorInterface
{
    public function visit(File $component);
    public function visit(Dir $component);
}

class File extends Component
{
    public function accept(ProcessorVisitorInterface $visitor){
        $visitor->visit($this);
    }
}
class Dir extends Component
{
    public function accept(ProcessorVisitorInterface $visitor){
        $visitor->visit($this);
    }
}
```

実施は、メソッドを分ける必要があり、次のように記述する必要がある。

```
interface ProcessorVisitorInterface
{
    public function visitFile(File $component);
    public function visitDir(Dir $component);
}

class File extends Component
{
    public function accept(ProcessorVisitorInterface $visitor){
        $visitor->visitFile($this);
    }
}
class Dir extends Component
{
    public function accept(ProcessorVisitorInterface $visitor){
        $visitor->visitDir($this);
    }
}

```

それぞれのクラスにてacceptメソッドの中で、visitFile/visitDirの記述を分ける。
acceptメソッドを共通化したい場合には、
次のように、Visitorクラスで、インスタンスの条件分岐を行う事になるが、


```
interface ProcessorVisitorInterface
{
    public function visit(Component $component);
}
class File extends Component
{
    public function accept(ProcessorVisitorInterface $visitor){
        $visitor->visit($this);
    }
}
class Dir extends Component
{
    public function accept(ProcessorVisitorInterface $visitor){
        $visitor->visit($this);
    }
}


class SomeVisitor
    public function visit(Component $component)
    {
        if ($component instanceof Dir) {
            $this->visitDir($component);
        } else if ($component instanceof File) {
            $this->visitFile($component);
        } else {
            throw new Exception('ERROR!');
        }
    }

    public function visitFile(File $component)
    {
        ...処理...
    }

    public function visitDir(Dir $component)
    {
        ...処理...

        // 子要素を巡回
        foreach ($component->getChildren() as $child) {
            $this->accept($child);
        }
    }

}
```