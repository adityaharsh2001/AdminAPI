var mysql = require('mysql');

const Connectdb = () => {
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "quadB"
      });
      
      db.connect(function(err) {
        if (err) throw err;
        console.log("Connected to SQL DATABASE");
        db.query("CREATE DATABASE IF NOT EXISTS quadB", function (err, result) {
          if (err) throw err;
        });
      });

      let sql = `CREATE TABLE IF NOT EXISTS users(
        user_id varchar(255),
        user_name VARCHAR(255),
        user_email VARCHAR(255),
        user_password VARCHAR(255),
        total_order int,
        created_at DATETIME,
        last_logged_in DATETIME,
        PRIMARY KEY(user_id)
    )`
    db.query(sql, err => {
        if(err) throw err;
        console.log("Table Created")
    })

    return db;
}

module.exports = 
    Connectdb

