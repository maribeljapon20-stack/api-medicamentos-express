const express = require('express');
const router = express.Router();
const controlador = require('../Controlador/MedicamentoControlador');
const SecurityConfig = require('../Config/SecurityConfig');

// NOTA: Si dentro de SecurityConfig tu función se llama diferente (ej: verificarAuth), 
// cambia "SecurityConfig" por "SecurityConfig.nombreDeTuFuncion".
// Si exportaste la función directamente con module.exports = (req, res, next) => {...}, déjalo tal como está abajo:

// 1. Listar todos los medicamentos
router.get('/', SecurityConfig, controlador.listar);

// 🚀 2. BUSCAR UN MEDICAMENTO POR ID (Esta es la línea que te faltaba para solucionar el error de Postman)
router.get('/:id', SecurityConfig, controlador.buscarPorId);

// 3. Guardar un nuevo medicamento
router.post('/', SecurityConfig, controlador.guardar);

// 4. Actualizar un medicamento existente por ID
router.put('/:id', SecurityConfig, controlador.actualizar);

// 5. Eliminar un medicamento por ID
router.delete('/:id', SecurityConfig, controlador.eliminar);

module.exports = router;