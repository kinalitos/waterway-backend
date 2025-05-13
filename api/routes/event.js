const express = require('express');
const router = express.Router();
const eventController = require('../controller/event');
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', checkAuth, eventController.updateEvent);
router.delete('/:id', checkAuth, eventController.deleteEvent);

// Agregar imagen a un evento
router.post('/:id/images', checkAuth, eventController.addImage);
// Agregar participante a un evento
router.post('/:id/participants', checkAuth, eventController.addParticipant);

module.exports = router;