const express = require('express');
const router = express.Router();
const publicationController = require('../controller/publication');
const { authenticateToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Publications
 *   description: Gestión de publicaciones comunitarias
 */

/**
 * @swagger
 * /publications:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Publications]
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
 *                 example: Reforestación en zona 3
 *               content:
 *                 type: string
 *                 example: Se llevó a cabo una jornada de reforestación en la zona 3 con la participación de 20 voluntarios.
 *               author:
 *                 type: string
 *                 example: Juan Pérez
 *     responses:
 *       201:
 *         description: Publicación creada
 *       400:
 *         description: Datos inválidos
 */
router.post('/', authenticateToken, publicationController.createPublication);

/**
 * @swagger
 * /publications:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Publications]
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 */
router.get('/', publicationController.getAllPublications);

/**
 * @swagger
 * /publications/{id}:
 *   get:
 *     summary: Obtener una publicación por ID
 *     tags: [Publications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación encontrada
 *       404:
 *         description: Publicación no encontrada
 */
router.get('/:id', publicationController.getPublicationById);

/**
 * @swagger
 * /publications/{id}:
 *   put:
 *     summary: Actualizar una publicación
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación actualizada
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Publicación no encontrada
 */
router.put('/:id', authenticateToken, publicationController.updatePublication);

/**
 * @swagger
 * /publications/{id}:
 *   delete:
 *     summary: Eliminar una publicación
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación eliminada
 *       404:
 *         description: Publicación no encontrada
 */
router.delete('/:id', authenticateToken, publicationController.deletePublication);

module.exports = router;