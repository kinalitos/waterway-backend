// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API REST',
      version: '1.0.0',
      description: 'Documentación con Swagger para mi API RESTful',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./api/routes/*.js'], // Ajusta esta ruta si tus archivos están en otro lugar
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
