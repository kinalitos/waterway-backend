const express = require('express');
const router = express.Router();
const contaminationController = require('../controller/contaminationReport');
const { authenticateToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Contamination Reports
 *   description: Gestión de reportes de contaminación
 */

/**
 * @swagger
 * /contamination-reports:
 *   post:
 *     summary: Crear un nuevo reporte de contaminación
 *     tags: [Contamination Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - lat
 *               - lng
 *             properties:
 *               title:
 *                 type: string
 *                 example: Contaminación en el río
 *               description:
 *                 type: string
 *                 example: Se encontró basura en el río cerca del puente.
 *               lat:
 *                 type: number
 *                 example: 14.634915
 *               lng:
 *                 type: number
 *                 example: -90.506882
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     image_key:
 *                       type: string
 *                       example: imagen123.jpg
 *                     uploaded_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-05-16T08:06:00Z
 *     responses:
 *       201:
 *         description: Reporte creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', authenticateToken, exports.createReport);

/**
 * @swagger
 * /contamination-reports:
 *   get:
 *     summary: Obtener todos los reportes o por usuario/estado
 *     tags: [Contamination Reports]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: ID del usuario para filtrar reportes (opcional)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pendiente, validado, falso]
 *         description: Estado para filtrar reportes (opcional)
 *     responses:
 *       200:
 *         description: Lista de reportes
 *       500:
 *         description: Error del servidor
 */
router.get('/', authenticateToken, exports.getAllReports);

/**
 * @swagger
 * /contamination-reports/{id}:
 *   get:
 *     summary: Obtener un reporte por ID
 *     tags: [Contamination Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del reporte
 *     responses:
 *       200:
 *         description: Reporte encontrado
 *       404:
 *         description: Reporte no encontrado
 */
router.get('/:id', authenticateToken, exports.getReportById);

/**
 * @swagger
 * /contamination-reports/{id}:
 *   put:
 *     summary: Actualizar un reporte (solo el creador)
 *     tags: [Contamination Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del reporte
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Contaminación actualizada
 *               description:
 *                 type: string
 *                 example: Actualización del reporte.
 *               lat:
 *                 type: number
 *                 example: 14.635000
 *               lng:
 *                 type: number
 *                 example: -90.507000
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     image_key:
 *                       type: string
 *                       example: imagen456.jpg
 *                     uploaded_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-05-16T08:06:00Z
 *     responses:
 *       200:
 *         description: Reporte actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Reporte no encontrado
 *       403:
 *         description: No autorizado
 */
router.put('/:id', authenticateToken, exports.updateReport);

/**
 * @swagger
 * /contamination-reports/{id}:
 *   delete:
 *     summary: Eliminar un reporte
 *     tags: [Contamination Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del reporte
 *     responses:
 *       200:
 *         description: Reporte eliminado
 *       404:
 *         description: Reporte no encontrado
 *       403:
 *         description: No autorizado
 */
router.delete('/:id', authenticateToken, exports.deleteReport);

/**
 * @swagger
 * /contamination-reports/{id}/images:
 *   post:
 *     summary: Agregar una imagen al reporte
 *     tags: [Contamination Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del reporte
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
 *                 example: imagen789.jpg
 *     responses:
 *       200:
 *         description: Imagen agregada exitosamente
 *       400:
 *         description: Error al agregar imagen
 *       404:
 *         description: Reporte no encontrado
 *       403:
 *         description: No autorizado
 */
router.post('/:id/images', authenticateToken, exports.addImage);

/**
 * @swagger
 * /contamination-reports/{id}/status:
 *   put:
 *     summary: Actualizar el estado del reporte (moderador)
 *     tags: [Contamination Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del reporte
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pendiente, validado, falso]
 *                 example: validado
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Reporte no encontrado
 *       403:
 *         description: No autorizado
 */
router.put('/:id/status', authenticateToken, restrictToModerator, exports.updateReportStatus);

module.exports = router;