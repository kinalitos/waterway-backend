const express = require('express');
const router = express.Router();
const publicationController = require('../controller/publication');
const checkAuth = require('../middleware/auth.middleware');

router.post('/', checkAuth, publicationController.createPublication);
router.get('/', publicationController.getAllPublications);
router.get('/:id', publicationController.getPublicationById);
router.put('/:id', checkAuth, publicationController.updatePublication);
router.delete('/:id', checkAuth, publicationController.deletePublication);

module.exports = router;