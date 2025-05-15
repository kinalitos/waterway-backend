const express = require('express');
const router = express.Router();
const contaminationController = require('../controller/contaminationReport');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/', authenticateToken, contaminationController.createReport);
router.get('/', contaminationController.getAllReports);
router.get('/:id', contaminationController.getReportById);
router.put('/:id', authenticateToken, contaminationController.updateReport);
router.delete('/:id', authenticateToken, contaminationController.deleteReport);

// Agregar imagen a un reporte
router.post('/:id/images', authenticateToken, contaminationController.addImage);

module.exports = router;