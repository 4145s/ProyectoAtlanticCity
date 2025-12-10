const express = require('express');
const router = express.Router();

// Importar el controlador de clientes
const clienteController = require('../controllers/clienteController');

// Ruta para obtener todos los clientes
router.get('/', clienteController.obtenerClientes);

// Ruta para agregar un cliente
router.post('/', clienteController.agregarCliente);

module.exports = router;
