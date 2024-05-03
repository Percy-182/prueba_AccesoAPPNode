const express = require("express"); //Importa el módulo Express, que es un framework web para Node.js.
const pool = require("./bdConfig"); // Importar la configuración de la base de datos
const app = express(); //Crea una aplicación Express.
const port = 3000; //Define el número de puerto en el que la aplicación escuchará las solicitudes.

const {
  nuevoUser,
  getUsuarios,
  editUsuario,
  transferir,
  obtenerTransferencias,
} = require("./consultas"); //Importa funciones específicas desde un módulo externo llamado "consultas".

//Registra un middleware en express para permitir el análisis del cuerpo de las solicitudes con formato JSON.
app.use(express.json()); // Middleware para analizar solicitudes con formato JSON

//Define una ruta para manejar solicitudes GET a la ruta raíz ("/"). Cuando se accede a la raíz, la aplicación devuelve el archivo "index.html".
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Ruta para recibir los datos de un nuevo usuario y almacenarlos en PostgreSQL
app.post("/usuario", async (req, res) => {
  // Define una ruta POST en "/usuario" para manejar la creación de nuevos usuarios
  try {
    const { nombre, balance } = req.body; // Extrae el nombre y el balance del cuerpo de la solicitud
    console.log(req.body); // Imprime en la consola los datos recibidos en el cuerpo de la solicitud
    const resultado = await nuevoUser(nombre, balance); // Llama a la función "nuevoUser" para agregar el nuevo usuario a la base de datos
    res.status(201).json(resultado); // Devuelve una respuesta con el código de estado 201 (Created) y el usuario creado en formato JSON
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear usuario:", error); // Imprime en la consola un mensaje de error
    res.status(500).json({ error: "Error al crear usuario" }); // Devuelve una respuesta con el código de estado 500 (Internal Server Error) y un mensaje de error en formato JSON
  }
});

//devuelve los ususarios creados
app.get("/usuarios", async (req, res) => {
  try {
    const users = await getUsuarios();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Ruta en Express para manejar la edición de usuario
app.put("/usuario", async (req, res) => {
  try {
    const { id, nombre, balance } = req.body; // Obtener la ID, nombre y balance del cuerpo de la solicitud
    const resultado = await editUsuario(id, nombre, balance); // Llamar a la función que edita el usuario
    res.json(resultado); // Enviar una respuesta JSON con el resultado de la edición
  } catch (error) {
    console.error("Error al editar usuario:", error);
    res.status(500).json({ error: "Error al editar usuario" });
  }
});

//eliminar
app.delete("/usuario", async (req, res) => {
  const id = req.query.id;
  try {
    const result = await pool.query(`DELETE FROM usuarios WHERE id = $1`, [id]);
    res.send(result);
  } catch (error) {
    console.error("Error al eliminar", error);
    res.status(500).send("Error al eliminar el usuario");
  }
});

// Ruta para realizar una transferencia
app.post("/transferencia", async (req, res) => {
  try {
    // Extrae el emisor, receptor y monto de la transferencia del cuerpo de la solicitud
    const { emisor, receptor, monto } = req.body;
    // Realiza la transferencia entre usuarios
    await transferir(emisor, receptor, monto);
    // Devuelve un mensaje de exito
    res.status(200).json("Transferencia exitosa");
  } catch (error) {
    // Manejo de errores
    res
      .status(500)
      .json({ success: false, error: "Error al procesar la transferencia" });
  }
});

// Ruta para obtener todas las transferencias
app.get("/transferencias", async (req, res) => {
  try {
    // Obtiene todas las transferencias almacenadas
    const result = await obtenerTransferencias();
    // Devuelve las transferencias como respuesta
    res.status(200).json(result);
  } catch (error) {
    // Manejo de errores
    res
      .status(500)
      .json({ success: false, error: "Error al obtener las transferencias" });
  }
});

//Define una ruta genérica para manejar cualquier otra solicitud que no coincida con las rutas definidas anteriormente. En este caso, simplemente devuelve un mensaje indicando que la página no existe.
app.get("*", (req, res) => {
  //
  res.send("Esta página no existe");
});

//Inicia el servidor Express y lo hace escuchar en el puerto especificado. También imprime un mensaje en la consola indicando la URL donde se puede acceder al servidor.
app.listen(
  port,
  console.log(
    `El servidor está inicializado en el puerto http://localhost:${port}`
  )
);
