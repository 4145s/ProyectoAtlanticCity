const express = require('express');
const router = express.Router();

// Importar el controlador de promociones
const promocionController = require('../controllers/promocionController');

// Ruta para obtener todas las promociones
router.get('/', promocionController.obtenerPromociones);

// Ruta para agregar una nueva promoción
router.post('/', promocionController.agregarPromocion);

module.exports = router;
