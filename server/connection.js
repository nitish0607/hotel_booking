let mysql = require("mysql");

let connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "booking_engine"
});

connection.connect(() => {
    console.log("mysql is connected successfully");

});

module.exports = connection;