const Sequelize = require('sequelize');

// configure this with your own parameters
const database = new Sequelize({
    database: 'test4',
    username: 'root',
    user_user_password: '',
    dialect: 'mysql',
});

module.exports = database;
