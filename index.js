const express = require('express');
const cors = require('cors'); // <-- IMPORTAR ARRIBA
const swaggerUi = require('swagger-ui-express');
const database = require('./src/Config/database');
const rutasMedicamento = require('./src/Rutas/medicamentoRutas');

const app = express();

// ✅ HABILITAR CORS ANTES DE LAS RUTAS
app.use(cors());
app.use(express.json());

// Enlazar las rutas bajo el prefijo correcto
app.use('/api/medicamentos', rutasMedicamento);

// Documentación en formato JSON directo (Adiós errores de YAML y tabulaciones)
const swaggerDocumento = {
    openapi: '3.0.0',
    info: {
        title: 'API de Medicamentos (Express Arquitectura Limpia)',
        version: '1.0.0',
        description: 'Estructura modular en 7 capas idéntica al diseño en Java.'
    },
    servers: [{ url: 'http://localhost:8080' }],
    components: {
        securitySchemes: {
            basicAuth: {
                type: 'http',
                scheme: 'basic',
                description: 'Ingrese el usuario "admin" y contraseña "12345" para interactuar.'
            }
        },
        schemas: {
            Medicamento: {
                type: 'object',
                properties: {
                    nombre: { type: 'string' },
                    laboratorio: { type: 'string' },
                    precio: { type: 'number' },
                    stock: { type: 'integer' }
                }
            }
        }
    },
    paths: {
        '/api/medicamentos': {
            get: {
                summary: 'Listar todos los medicamentos',
                security: [{ basicAuth: [] }],
                responses: {
                    200: { description: 'Lista devuelta correctamente.' }
                }
            },
            post: {
                summary: 'Registrar un nuevo medicamento',
                security: [{ basicAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Medicamento' }
                        }
                    }
                },
                responses: {
                    201: { description: 'Guardado correctamente.' }
                }
            }
        },
        '/api/medicamentos/{id}': {
            put: {
                summary: 'Actualizar datos de un medicamento por ID',
                security: [{ basicAuth: [] }],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Medicamento' }
                        }
                    }
                },
                responses: {
                    200: { description: 'Modificado correctamente.' }
                }
            },
            delete: {
                summary: 'Eliminar un medicamento por ID',
                security: [{ basicAuth: [] }],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
                ],
                responses: {
                    200: { description: 'Eliminado correctamente.' }
                }
            }
        }
    }
};

// Servir la interfaz gráfica de Swagger
app.use('/swagger-ui/index.html', swaggerUi.serve, swaggerUi.setup(swaggerDocumento));

// Conectar Postgres y encender el Servidor
const PORT = 8080;
database.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`\n🚀 Servidor Express corriendo con éxito en: http://localhost:${PORT}`);
        console.log(`📊 Pantalla de Swagger lista en: http://localhost:${PORT}/swagger-ui/index.html\n`);
    });
}).catch(error => {
    console.error('❌ Error al conectar con pgAdmin:', error.message);
});