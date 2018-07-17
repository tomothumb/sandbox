const Sequelize = require('sequelize');

const sequelize_instance = new Sequelize('sample','username', 'password',{
    dialect:'sqlite',
    storage:'./database.sqlite'
});
sequelize_instance.query('select * from sample',null,{raw:true})
    .success(function(rows){
       console.log(rows);
    });

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