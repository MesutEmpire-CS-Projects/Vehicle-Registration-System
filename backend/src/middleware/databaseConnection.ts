import {QueryError, RowDataPacket} from "mysql2";

const mysql = require("mysql2");
require("dotenv").config();

//Connect to DB
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// const run = async ()=> {
//     const db = await pool.getConnection();
//     await db.beginTransaction();
//
// }
// run()

module.exports = pool;
