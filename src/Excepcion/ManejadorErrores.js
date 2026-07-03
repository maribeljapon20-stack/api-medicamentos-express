class ManejadorErrores extends Error {
    constructor(mensaje, codigoEstado) {
        super(mensaje);
        this.codigoEstado = codigoEstado;
    }
}

module.exports = ManejadorErrores;