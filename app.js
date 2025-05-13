const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// MongoDB
const uri = process.env.MONGODB_URI ;

mongoose
  .connect(uri, {
    useNewUrlParser: true, // Manejo moderno de análisis de URI
    useUnifiedTopology: true, // Mejora la compatibilidad con MongoDB Atlas
    ssl: true, // Asegura que SSL esté habilitado
  })
  .then(() => console.log("Conexión exitosa a MongoDB Atlas"))
  .catch((err) => console.error("Error conectando a MongoDB Atlas:", err));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

// Rutas
app.use('/companies', require('./api/routes/company'));
app.use('/events', require('./api/routes/event'));
app.use('/contamination-reports', require('./api/routes/contaminationReport'));
app.use('/publications', require('./api/routes/publication'));

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});

module.exports = app;