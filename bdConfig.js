// Importamos la librería de PostgreSQL y dotenv
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config(); // Carga las variables de entorno del archivo .env

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: "bancosolar", //cambiar por bd del desafio
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  min: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
});

//Funcion para verificar la conexion a la base de datos
const conectarDB = async () => {
  try {
    const res = await pool.query(`SELECT NOW()`);
    console.log("Conexion exitosa, fecha y hora actuales:", res.rows[0]);
  } catch (error) {
    console.error("Error al conectar a la Base de datos", error);
  }
};
//Llamar a la funcion de conectarDB
conectarDB();

module.exports = pool;
