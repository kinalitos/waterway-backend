const express = require('express');
const router = express.Router();
const contaminationController = require('../controller/contaminationReport');
const checkAuth = require('../middleware/auth.middleware');

router.post('/', checkAuth, contaminationController.createReport);
router.get('/', contaminationController.getAllReports);
router.get('/:id', contaminationController.getReportById);
router.put('/:id', checkAuth, contaminationController.updateReport);
router.delete('/:id', checkAuth, contaminationController.deleteReport);

// Agregar imagen a un reporte
router.post('/:id/images', checkAuth, contaminationController.addImage);

module.exports = router;