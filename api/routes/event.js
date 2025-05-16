const express = require('express');
const router = express.Router();
const eventController = require('../controller/event');
const { authenticateToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Gestión de eventos comunitarios
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Limpieza de parque
 *               description:
 *                 type: string
 *                 example: Jornada de limpieza comunitaria.
 *               location:
 *                 type: string
 *                 example: Zona 10
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-06-01T10:00:00.000Z
 *     responses:
 *       201:
 *         description: Evento creado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', authenticateToken, eventController.createEvent);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista de eventos
 */
router.get('/', eventController.getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 */
router.get('/:id', eventController.getEventById);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Actualizar un evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       404:
 *         description: Evento no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', authenticateToken, eventController.updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Eliminar un evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento eliminado
 *       404:
 *         description: Evento no encontrado
 */
router.delete('/:id', authenticateToken, eventController.deleteEvent);
router.get('/filter', eventController.filterEvents);

/**
 * @swagger
 * /events/{id}/images:
 *   post:
 *     summary: Agregar una imagen al evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - image_key
 *             properties:
 *               image_key:
 *                 type: string
 *                 example: imagen_evento1.jpg
 *     responses:
 *       200:
 *         description: Imagen agregada
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Evento no encontrado
 */
router.post('/:id/images', authenticateToken, eventController.addImage);

/**
 * @swagger
 * /events/{id}/participants:
 *   post:
 *     summary: Agregar un participante al evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: 662f4567abc1234c56789def
 *     responses:
 *       200:
 *         description: Participante agregado
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Evento no encontrado
 */
router.post('/:id/participants', authenticateToken, eventController.addParticipant);

module.exports = router;
