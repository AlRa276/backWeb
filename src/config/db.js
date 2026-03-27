import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();


const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});


pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar a MySQL:', err.message);
    } else {
        console.log('✅ ¡Conectado exitosamente a la base de datos MySQL!');
        connection.release();
    }
});


export default pool.promise();