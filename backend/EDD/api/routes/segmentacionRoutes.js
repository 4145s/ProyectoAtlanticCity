const express = require('express');
const router = express.Router();

// Importar el controlador de segmentación
const segmentacionController = require('../controllers/segmentacionController');

// Ruta para obtener todas las segmentaciones
router.get('/', segmentacionController.obtenerSegmentaciones);

// Ruta para agregar una nueva segmentación
router.post('/', segmentacionController.agregarSegmentacion);

module.exports = router;
