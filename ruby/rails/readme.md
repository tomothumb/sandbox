### Install
```
$ bundle install --path vendor/bundle
$ bundle install --without production

```

### Basic Usage
```
# Serve
$ bundle exec rails server

# Console
$ bundle exec rails console


$ bundle exec rails s

$ bundle exec rails new ~

# Migration
$ bundle exec rails db:migrate
$ bundle exec rails db:rollback
$ bundle exec rails db:create
$ bundle exec rails db:seed

```

### Test
```
$ bundle exec rails test
$ bundle exec rails test:controllers
$ bundle exec rails test:integration
$ bundle exec rails test:helpers
```

### Genarator
```
$ bundle exec rails generate scaffold Micropost content:text user_id:integer
$ bundle exec rails generate controller StaticPages home help
```

---


## Basic

```
>> "foobar".length
=> 6


>> "foobar".empty?
=> false
>> "".empty?
=> true


>> s = "foobar"
>> if s.empty?
>>   "The string is empty"
>> else
>>   "The string is nonempty"
>> end
=> "The string is nonempty"


>> if s.nil?
>>   "The variable is nil"
>> elsif s.empty?
>>   "The string is empty"
>> elsif s.include?("foo")
>>   "The string includes 'foo'"
>> end
=> "The string includes 'foo'"
```

### nil
```
>> x = "foo"
=> "foo"
>> y = ""
=> ""
>> puts "Both strings are empty" if x.empty? && y.empty?
=> nil


>> nil.to_s
=> ""


>> nil.empty?
NoMethodError: undefined method `empty?' for nil:NilClass
>> nil.to_s.empty?      # メソッドチェーンの例
=> true


>> "foo".nil?
=> false
>> "".nil?
=> false
>> nil.nil?
=> true


>> !!nil
=> false

>> !!0
=> true
```

### String

### Array
```
>>  "foo bar     baz".split
=> ["foo", "bar", "baz"]


>> "fooxbarxbaz".split('x')
=> ["foo", "bar", "baz"]

>> a = [42, 8, 17]
=> [42, 8, 17]
>> a.first
=> 42
>> a.second
=> 8
>> a.last
=> 17
>> a.last == a[-1]
=> true

>> a.empty?
=> false
>> a.include?(42)
=> true
>> a.sort
=> [8, 17, 42]
>> a.reverse
=> [17, 8, 42]
>> a.shuffle
=> [17, 42, 8]
>> a
=> [42, 8, 17]

>> a.sort!
=> [8, 17, 42]
>> a
=> [8, 17, 42]


>> a = [42, 8, 17]
=> [42, 8, 17]
>> a.push(6)
=> [42, 8, 17, 6]
>> a << 7
=> [42, 8, 17, 6, 7]
>> a << "foo" << "bar"
=> [42, 8, 17, 6, 7, "foo", "bar"]

>> a.join
=> "4281767foobar"
>> a.join(', ')
=> "42, 8, 17, 6, 7, foo, bar"
```

### Range
```
>> 0..9
=> 0..9
>> 0..9.to_a    # 9に対してto_aを呼んでしまっていますね
NoMethodError: undefined method `to_a' for 9:Fixnum
>> (0..9).to_a
=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

>> a = %w[foo bar baz quux]    # %wを使って文字列の配列に変換
=> ["foo", "bar", "baz", "quux"]
>> a[0..2]
=> ["foo", "bar", "baz"]

>> a = (0..9).to_a
=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
>> a[2..(a.length-1)]
=> [2, 3, 4, 5, 6, 7, 8, 9]
>> a[2..-1]
=> [2, 3, 4, 5, 6, 7, 8, 9]

>> ('a'..'e').to_a
=> ["a", "b", "c", "d", "e"]
```

### Block
```
>> (1..5).each { |i| puts 2 * i }
2
4
6
8
10
=> 1..5


>> (1..5).each do |number|
?>   puts 2 * number
>>   puts '--'
>> end
2
--
4
--
6
--
8
--
10
--
=> 1..5



>> 3.times { puts "Betelgeuse!" }
"Betelgeuse!"
"Betelgeuse!"
"Betelgeuse!"
=> 3

>> (1..5).map { |i| i**2 }
=> [1, 4, 9, 16, 25]

>> %w[a b c]
=> ["a", "b", "c"]
>> %w[a b c].map { |char| char.upcase }
=> ["A", "B", "C"]
>> %w[A B C].map { |char| char.downcase }
=> ["a", "b", "c"]
>> %w[A B C].map(&:downcase)
=> ["a", "b", "c"]
```