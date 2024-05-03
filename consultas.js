// Importa un módulo llamado "pool" desde el archivo "./dbConfig.js". Presumiblemente, este módulo contiene una configuración de conexión a la base de datos.
const pool = require("./bdConfig");

const nuevoUser = async (nombre, balance) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *",
      [nombre, balance]
    );
    return rows[0]; // Devuelve el usuario insertado
  } catch (error) {
    console.error("Error al insertar", error);
    throw error;
  }
};

//consulta los usuarios creados
const getUsuarios = async () => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
  } catch (error) {
    console.error("Error al consultar", error);
  }
};

// Función para editar un usuario en la base de datos
const editUsuario = async (id, nombre, balance) => {
  try {
    const result = await pool.query(
      "UPDATE usuarios SET nombre = $2, balance = $3 WHERE id = $1 RETURNING *",
      [id, nombre, balance]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al editar usuario en la base de datos:", error);
    throw error;
  }
};

//Función para eliminar un usuario de la tabla usuarios
const eliminarUsuario = async (id) => {
  try {
    const result = await pool.query(`DELETE FROM usuarios WHERE id = $1`, [id]);
    console.log(eliminarUsuario);
    console.log(result);
    return result.rows;
  } catch (error) {
    console.error("Error al eliminar", error);
  }
};

// Función para realizar una transferencia
const transferir = async (emisor, receptor, monto) => {
  try {
    // Iniciar una transacción SQL
    await pool.query("BEGIN");
    // Actualizar el balance del emisor
    await pool.query(
      "UPDATE usuarios SET balance = balance - $1 WHERE id = $2",
      [monto, emisor]
    );
    // Actualizar el balance del receptor
    await pool.query(
      "UPDATE usuarios SET balance = balance + $1 WHERE id = $2",
      [monto, receptor]
    );
    // Insertar el registro de la transferencia
    await pool.query(
      "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW())",
      [emisor, receptor, monto]
    );
    // Confirmar la transacción SQL
    await pool.query("COMMIT");
    console.log(
      "transferencia realizada con exito:",
      "monto:",
      monto,
      "de",
      receptor,
      "a",
      emisor
    );
  } catch (error) {
    // Si ocurre un error, hacer rollback de la transacción SQL
    await pool.query("ROLLBACK");
    console.error("Error al procesar transferencia", error);
  }
};

// Función para obtener todas las transferencias almacenadas
const obtenerTransferencias = async () => {
  try {
    // Consultar todas las transferencias
    const result = await pool.query("SELECT * FROM transferencias");
    return result.rows;
  } catch (error) {
    // Enviar respuesta de error si ocurre un problema
    console.error("Error al ontener transferencias", error);
  }
};

//Exporta las funciones "nuevaCancion", "prepararCancion", "editarCancion" y "eliminarCancion" para que puedan ser utilizadas en otros archivos de Node.js.
module.exports = {
  nuevoUser,
  getUsuarios,
  editUsuario,
  eliminarUsuario,
  transferir,
  obtenerTransferencias,
};
