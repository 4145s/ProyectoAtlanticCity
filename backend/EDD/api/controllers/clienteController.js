const mysql = require('mysql2');

// Configuración de la conexión con MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mi_base_de_datos'
});

// Obtener todos los clientes desde la base de datos
const obtenerClientes = (req, res) => {
  connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener los clientes', error: err });
    }
    res.json(results); // Retorna los resultados (clientes) en formato JSON
  });
};

// Agregar un nuevo cliente a la base de datos
const agregarCliente = (req, res) => {
  const { nombre, email, segmento } = req.body;
  const query = 'INSERT INTO clientes (nombre, email, segmento) VALUES (?, ?, ?)';
  
  connection.query(query, [nombre, email, segmento], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al agregar el cliente', error: err });
    }
    res.status(201).json({
      id: results.insertId, // ID generado automáticamente
      nombre,
      email,
      segmento
    });
  });
};

module.exports = { obtenerClientes, agregarCliente };
