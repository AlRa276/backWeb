import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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