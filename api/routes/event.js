const express = require('express');
const router = express.Router();
const eventController = require('../controller/event');
const checkAuth = require('../middleware/check-auth');

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/filter', eventController.filterEvents);

// Agregar imagen a un evento
router.post('/:id/images', eventController.addImage);
// Agregar participante a un evento
router.post('/:id/participants', eventController.addParticipant);

module.exports = router;