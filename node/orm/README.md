# Sequelize

## Create Model file and Migration file
```
# create model
$ node_modules/.bin/sequelize model:generate --name Ogp --attributes title:string,description:text
    - --name
    - --attributes

# migration
$ node_modules/.bin/sequelize db:migrate

```
