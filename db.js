const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connectionConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE
};

// Hanya tambahkan password jika ada
if (process.env.PASSWORD) {
    connectionConfig.password = process.env.PASSWORD;
}

const connection = mysql.createConnection(connectionConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;
