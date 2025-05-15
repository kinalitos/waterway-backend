const express = require('express');
const router = express.Router();
const publicationController = require('../controller/publication');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/', authenticateToken, publicationController.createPublication);
router.get('/', publicationController.getAllPublications);
router.get('/:id', publicationController.getPublicationById);
router.put('/:id', authenticateToken, publicationController.updatePublication);
router.delete('/:id', authenticateToken, publicationController.deletePublication);

module.exports = router;