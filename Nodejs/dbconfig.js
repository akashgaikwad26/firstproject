const fs = require("fs");

//TODO: add const for schema -> pravinyam

const dbconfig = {
    user: 'doadmin',
    host: 'pravinyam-dev-do-user-9198634-0.b.db.ondigitalocean.com',
    database: 'defaultdb',
    password: 'AVNS_2m9O1KvsArYEZGiY5Kx',
    port: 25060,
    _connectionTimeoutMillis: 0,
    idleTimeoutMillis: 2000,
    ssl  : {
        ca : fs.readFileSync( __dirname +'/ca-certificate.crt')
    }
}

module.exports = dbconfig;