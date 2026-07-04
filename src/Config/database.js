const { Sequelize } = require('sequelize');

// Usa la variable de entorno DATABASE_URL de Render
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error('❌ Error: La variable de entorno DATABASE_URL no está definida.');
    process.exit(1); // Detiene la aplicación si no encuentra la URL
}

const database = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Necesario para conexiones a Render
        }
    }
});

module.exports = database;