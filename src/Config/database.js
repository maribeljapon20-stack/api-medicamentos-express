const { Sequelize } = require('sequelize');

// Usar la variable de entorno de Render (o local si no existe)
const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Necesario para Render
        }
    }
});

module.exports = database;