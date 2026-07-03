const { Sequelize } = require('sequelize');

// Conexión limpia a tus credenciales de pgAdmin
const database = new Sequelize('medicamentos_db', 'postgres', 'Cinthya-23', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = database;