# prueba_Acceso_deDatos_APPNode

API RESTful utilizando PostgreSQL para la persistencia de datos, Manejar errores y Manejar códigos de estado HTTP.

## Descripción

El Banco Solar acaba de decidir invertir una importante suma de dinero para contratar un equipo de desarrolladores Full Stack que desarrollen un nuevo sistema de transferencias, y han anunciado que todo aquel que postule al cargo debe realizar un servidor con Node que utilice PostgreSQL para la gestión y persistencia de datos, y simular un sistema de transferencias.

El sistema debe permitir registrar nuevos usuarios con un balance inicial y basados en estos, realizar transferencias de saldos entre ellos. En esta prueba contarás con una aplicación cliente preparada para consumir las rutas que deberás crear en el servidor.

## Rutas a Crear

Las rutas que deberás crear son las siguientes:
● / GET: Devuelve la aplicación cliente disponible en el apoyo de la prueba.
● /usuario POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.
● /usuarios GET: Devuelve todos los usuarios registrados con sus balances.
● /usuario PUT: Recibe los datos modificados de un usuario registrado y los actualiza.
● /usuario DELETE: Recibe el id de un usuario registrado y lo elimina .
● /transferencia POST: Recibe los datos para realizar una nueva transferencia. Se
debe ocupar una transacción SQL en la consulta a la base de datos.
● /transferencias GET: Devuelve todas las transferencias almacenadas en la base de
datos en formato de arreglo.

## Intrucciones para crear la BD

Para iniciar con la persistencia de datos se deben ocupar las siguientes instrucciones SQL:

**_CREATE DATABASE_** bancosolar;

**_CREATE TABLE_** usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50),
balance FLOAT CHECK (balance >= 0));

**_CREATE TABLE_** transferencias (id SERIAL PRIMARY KEY, emisor INT, receptor INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));

## Requerimientos📜

1. Utilizar el paquete pg para conectarse a PostgreSQL y realizar consultas DML para la gestión y persistencia de datos. **(3 Puntos)**
2. Usar transacciones SQL para realizar el registro de las transferencias. **(2 Puntos)**
3. Servir una API RESTful en el servidor con los datos de los usuarios almacenados en PostgreSQL. **(3 Puntos)**
4. Capturar los posibles errores que puedan ocurrir a través de bloques catch o parámetros de funciones callbacks para condicionar las funciones del servidor. **(1 Punto)**
5. Devolver correctamente los códigos de estado según las diferentes situaciones. **(1 Punto)**

## Empezando 🚀

Estas instrucciones te guiarán para obtener una copia de este proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

```bash
git git@github.com:Percy-182/prueba_AccesoAPPNode.git
```

### Pre-requisitos 📋

Lista de software y herramientas, incluyendo versiones, que necesitas para instalar y ejecutar este proyecto:

- Sistema Operativo (Ubuntu 20.04, Windows 10, MacOS 10.15)
- Navegador (Firefox, Opera, Chrome, Brave, Safari)
