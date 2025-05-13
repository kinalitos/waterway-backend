const express = require('express');
const router = express.Router();
const companyController = require('../controller/company');
const checkAuth = require('../middleware/check-auth');

// CRUD básico
router.post('/', checkAuth, companyController.createCompany);
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);
router.put('/:id', checkAuth, companyController.updateCompany);
router.delete('/:id', checkAuth, companyController.deleteCompany);

// Agregar imagen a una compañía
router.post('/:id/images', checkAuth, companyController.addImage);

module.exports = router;