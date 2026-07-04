const { Sequelize } = require('sequelize');

// Usa variable de entorno si existe (Render), sino usa datos locales
const database = new Sequelize(
    process.env.DATABASE_URL || 'postgresql://postgres:Cinthya-23@localhost:5432/medicamentos_db',
    {
        dialect: 'postgres',
        logging: false,
        dialectOptions: process.env.DATABASE_URL ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {}
    }
);

module.exports = database;