const MedicamentoServicio = require('../Servicio/MedicamentoServicio');

exports.listar = async (req, res) => {
    try {
        const lista = await MedicamentoServicio.listarMedicamentos();
        res.json(lista);
    } catch (error) {
        res.status(error.codigoEstado || 500).json({ error: error.message });
    }
};

// 🚀 MÉTODO CORREGIDO: Busca directamente en la lista sin detonar errores de actualización
exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Consultar la lista general desde el servicio
        const lista = await MedicamentoServicio.listarMedicamentos();
        const encontrado = lista.find(m => m.id == id);
        
        // Si el elemento no existe, retornar 404
        if (!encontrado) {
            return res.status(404).json({ error: `Medicamento con ID ${id} no encontrado.` });
        }
        
        // Si existe, retornar el objeto con un estado 200 de forma exitosa
        res.json(encontrado);
    } catch (error) {
        res.status(error.codigoEstado || 500).json({ error: error.message });
    }
};

exports.guardar = async (req, res) => {
    try {
        const nuevo = await MedicamentoServicio.guardarMedicamento(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(error.codigoEstado || 400).json({ error: error.message });
    }
};

exports.actualizar = async (req, res) => {
    try {
        const modificado = await MedicamentoServicio.actualizarMedicamento(req.params.id, req.body);
        res.json(modificado);
    } catch (error) {
        res.status(error.codigoEstado || 400).json({ error: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        const resultado = await MedicamentoServicio.eliminarMedicamento(req.params.id);
        res.json(resultado);
    } catch (error) {
        res.status(error.codigoEstado || 500).json({ error: error.message });
    }
};