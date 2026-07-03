const { DataTypes } = require('sequelize');
const database = require('../Config/database');

const Medicamento = database.define('Medicamento', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    laboratorio: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'medicamentos',
    timestamps: false
});

module.exports = Medicamento;