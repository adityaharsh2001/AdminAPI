const Sequelize = require('sequelize');
const db = require('../config/database');

// creation of the User model
const User = db.define('user', {

    user_email: {
        type: Sequelize.STRING,
    },
    user_password: {
        type: Sequelize.STRING,
    },
    user_name :{
        type: Sequelize.STRING
    } ,
    total_order : {
        type: Sequelize.STRING
    }
   
});


module.exports = User;
