const mysql = require('mysql2');

// Configuración de la conexión con MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mi_base_de_datos'
});

// Obtener todas las segmentaciones desde la base de datos
const obtenerSegmentaciones = (req, res) => {
  connection.query('SELECT * FROM segmentacion', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las segmentaciones', error: err });
    }
    res.json(results);
  });
};

// Agregar una nueva segmentación a la base de datos
const agregarSegmentacion = (req, res) => {
  const { nombre, criterios } = req.body;
  const query = 'INSERT INTO segmentacion (nombre, criterios) VALUES (?, ?)';
  
  connection.query(query, [nombre, criterios], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al agregar la segmentación', error: err });
    }
    res.status(201).json({
      id: results.insertId,
      nombre,
      criterios
    });
  });
};

module.exports = { obtenerSegmentaciones, agregarSegmentacion };
