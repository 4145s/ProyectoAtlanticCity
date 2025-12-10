const mysql = require('mysql2');

// Configuración de la conexión con MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mi_base_de_datos'
});

// Obtener todas las promociones desde la base de datos
const obtenerPromociones = (req, res) => {
  connection.query('SELECT * FROM promociones', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las promociones', error: err });
    }
    res.json(results);
  });
};

// Agregar una nueva promoción a la base de datos
const agregarPromocion = (req, res) => {
  const { nombre, descripcion } = req.body;
  const query = 'INSERT INTO promociones (nombre, descripcion) VALUES (?, ?)';
  
  connection.query(query, [nombre, descripcion], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al agregar la promoción', error: err });
    }
    res.status(201).json({
      id: results.insertId,
      nombre,
      descripcion
    });
  });
};

module.exports = { obtenerPromociones, agregarPromocion };

