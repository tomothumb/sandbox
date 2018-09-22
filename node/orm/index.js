const Sequelize = require('sequelize');
const models = require('./models');

const sequelize = new Sequelize('aa','', '',{
    dialect:'sqlite',
    storage:'./database.sqlite'
});
// sequelize.query('select * from demo',null,{raw:true})
//     .success(function(rows){
//        console.log(rows);
//     });
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });


const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
User.sync({force: false}).then(() => {
    // Table created
    User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });

    var user = User.build({
        firstName: 'fname',
        lastName: 'lname'
    });
    // 作成したインスタンスのsaveで保存をする
    // user
    //     .save()
    //     .complete(function(err) {
    //             // findまたはfindAllでデータを取得
    //             User.findAll({where:['id>?',0]}).success(function(result) {
    //                 console.log(result);
    //             });
    //         }
    //     );
    // Quick example

});

sequelize.query("SELECT * FROM users").then(myTableRows => {
    console.log("row",myTableRows)
});
sequelize.query("SELECT * FROM users", { model: User }).then(users => {
    // Each record will now be mapped to the project's model.
    // console.log("model",users)
});
//
// User.findAll().then(users => {
//     console.log(users)
// });

// const sequelize = new Sequelize('database', 'username', 'password', {
//     dialect: 'sqlite',
//     host: 'my.server.tld',
//     port: 12345,
//     logging: true,
//     storage: './database.sqlite',
//     omitNull: true,
//     native: true,
//     define: {
//       underscored: false,
//       freezeTableName: false,
//       charset: 'utf8',
//       dialectOptions: {
//         collate: 'utf8_general_ci'
//       },
//       timestamps: true
//     },
//
//     // similar for sync: you can define this to always force sync for models
//     sync: { force: true },
//
//     // pool configuration used to pool database connections
//     pool: {
//       max: 5,
//       idle: 30000,
//       acquire: 60000,
//     },
//
//     // isolation level of each transaction
//     // defaults to dialect default
//     isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
//   })

console.log("models",models.employee);
models.employee.count().then(c => {
    console.log("There are " + c + " projects!")
})
models.employee.all().then(employees => {
    console.log(employees);
    // res.render('employee/index', {employees : employees});
});

// With Express.js Sample
// exports.index = function(req, res, next) {
//     models.Employee.all().then(employees => {
//         res.render('employee/index', {employees : employees});
//     });
// };