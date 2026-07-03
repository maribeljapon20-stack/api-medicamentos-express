const MedicamentoRepositorio = require('../Repositorio/MedicamentoRepositorio');
const ManejadorErrores = require('../Excepcion/ManejadorErrores');

class MedicamentoServicio {
    async listarMedicamentos() {
        return await MedicamentoRepositorio.obtenerTodos();
    }

    async guardarMedicamento(datos) {
        // 1. Validar obligatoriedad (que existan y no estén vacíos)
        if (!datos.nombre || datos.nombre.trim() === "") {
            throw new ManejadorErrores('El nombre del medicamento es obligatorio.', 400);
        }
        if (!datos.laboratorio || datos.laboratorio.trim() === "") {
            throw new ManejadorErrores('El laboratorio es obligatorio.', 400);
        }
        if (datos.precio === undefined || datos.precio === null || datos.precio === "") {
            throw new ManejadorErrores('El precio es obligatorio.', 400);
        }
        if (datos.stock === undefined || datos.stock === null || datos.stock === "") {
            throw new ManejadorErrores('El stock es obligatorio.', 400);
        }

        // 2. Validar que no tomen valores negativos
        if (Number(datos.precio) < 0) {
            throw new ManejadorErrores('El precio no puede tomar valores negativos.', 400);
        }
        if (Number(datos.stock) < 0) {
            throw new ManejadorErrores('El stock no puede tomar valores negativos.', 400);
        }

        return await MedicamentoRepositorio.crear(datos);
    }

    async actualizarMedicamento(id, datosNuevos) {
        const medicamento = await MedicamentoRepositorio.buscarPorId(id);
        if (!medicamento) {
            throw new ManejadorErrores(`Medicamento con ID ${id} no encontrado.`, 404);
        }

        // Validaciones estrictas también al momento de actualizar datos existentes
        if (datosNuevos.nombre !== undefined && datosNuevos.nombre.trim() === "") {
            throw new ManejadorErrores('El nombre del medicamento no puede estar vacío.', 400);
        }
        if (datosNuevos.laboratorio !== undefined && datosNuevos.laboratorio.trim() === "") {
            throw new ManejadorErrores('El laboratorio no puede estar vacío.', 400);
        }
        if (datosNuevos.precio !== undefined && (datosNuevos.precio === null || datosNuevos.precio === "")) {
            throw new ManejadorErrores('El precio no puede ser nulo o estar vacío.', 400);
        }
        if (datosNuevos.stock !== undefined && (datosNuevos.stock === null || datosNuevos.stock === "")) {
            throw new ManejadorErrores('El stock no puede ser nulo o estar vacío.', 400);
        }

        // Validar que los nuevos valores numéricos no sean negativos
        if (datosNuevos.precio !== undefined && Number(datosNuevos.precio) < 0) {
            throw new ManejadorErrores('El precio no puede tomar valores negativos.', 400);
        }
        if (datosNuevos.stock !== undefined && Number(datosNuevos.stock) < 0) {
            throw new ManejadorErrores('El stock no puede tomar valores negativos.', 400);
0        }

        return await MedicamentoRepositorio.actualizar(medicamento, datosNuevos);
    }

    async eliminarMedicamento(id) {
        const medicamento = await MedicamentoRepositorio.buscarPorId(id);
        if (!medicamento) {
            throw new ManejadorErrores(`Medicamento con ID ${id} no encontrado.`, 404);
        }
        await MedicamentoRepositorio.eliminar(medicamento);
        return { mensaje: `Medicamento con ID ${id} eliminado correctamente.` };
    }
}

module.exports = new MedicamentoServicio();