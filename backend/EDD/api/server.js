const express = require('express');
const mysql = require('mysql2');  // Importar mysql2
const app = express();
const port = 3000;

// Middleware para manejar peticiones JSON
app.use(express.json());

// Crear una conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',   // Si usas localhost, déjalo como está
  user: 'root',        // El nombre de usuario de tu base de datos (normalmente 'root')
  password: '1234',        // La contraseña de tu base de datos (deja vacío si no tiene contraseña)
  database: 'mi_base_de_datos'  // El nombre de la base de datos que estás usando
});

// Conectar a la base de datos MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL con ID', connection.threadId);
});

// Ruta de ejemplo para probar la conexión
app.get('/', (req, res) => {
  res.send('¡Servidor corriendo y conectado a MySQL!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
const clienteRoutes = require('./routes/clienteRoutes');
const promocionRoutes = require('./routes/promocionRoutes');
const segmentacionRoutes = require('./routes/segmentacionRoutes');

// Usar las rutas en el servidor
app.use('/api/clientes', clienteRoutes);
app.use('/api/promociones', promocionRoutes);
app.use('/api/segmentaciones', segmentacionRoutes);

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});