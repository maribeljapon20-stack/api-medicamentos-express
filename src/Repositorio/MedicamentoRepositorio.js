const Medicamento = require('../Entidad/Medicamento');

class MedicamentoRepositorio {
    async obtenerTodos() {
        return await Medicamento.findAll();
    }
    async buscarPorId(id) {
        return await Medicamento.findByPk(id);
    }
    async crear(datos) {
        return await Medicamento.create(datos);
    }
    async actualizar(instancia, datosNuevos) {
        return await instancia.update(datosNuevos);
    }
    async eliminar(instancia) {
        return await instancia.destroy();
    }
}

module.exports = new MedicamentoRepositorio();