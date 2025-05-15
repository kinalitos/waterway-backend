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
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  },
  apis: ['./routes/*js'], 
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
