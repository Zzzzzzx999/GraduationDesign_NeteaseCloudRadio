const mysql = require('mysql')

const db = mysql.createPool({
    host:'192.168.1.7',
    // host:'127.0.0.1',
    user:'root',
    password:'mysql',
    database:'musicStation',
})
module.exports = db