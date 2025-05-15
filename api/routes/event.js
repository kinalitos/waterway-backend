const express = require('express');
const router = express.Router();
const eventController = require('../controller/event');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/', authenticateToken, eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', authenticateToken, eventController.updateEvent);
router.delete('/:id', authenticateToken, eventController.deleteEvent);
router.get('/filter', eventController.filterEvents);

// Agregar imagen a un evento
router.post('/:id/images', authenticateToken, eventController.addImage);
// Agregar participante a un evento
router.post('/:id/participants', authenticateToken, eventController.addParticipant);

module.exports = router;