### Install
```
$ bundle install --path vendor/bundle
$ bundle install --without production

```

### Basic Usage
```
$ bundle exec rails serve
$ bundle exec rails s

$ bundle exec rails new ~

$ bundle exec rails db:migrate
$ bundle exec rails db:create
$ bundle exec rails db:seed

$ bundle exec rails test

```

### Genarator
```
$ bundle exec rails generate scaffold Micropost content:text user_id:integer
$ bundle exec rails generate controller StaticPages home help
```