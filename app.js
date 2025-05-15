const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

//SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB
const uri = process.env.MONGODB_URI ;

mongoose
  .connect(uri, {
    useNewUrlParser: true, // Manejo moderno de análisis de URI
    useUnifiedTopology: true, // Mejora la compatibilidad con MongoDB Atlas
    ssl: true, // Asegura que SSL esté habilitado
  })
  .then(() => console.log("Conexión exitosa a MongoDB Atlas"))
  .catch((err) => console.error("Error conectando   a MongoDB Atlas:", err));

// Rutas
app.use('/events', require('./api/routes/event'));
app.use('/contamination-reports', require('./api/routes/contaminationReport'));
app.use('/publications', require('./api/routes/publication'));
app.use('/users', require('./api/routes/user'));
app.use('/auth', require('./api/routes/auth'));

module.exports = app;