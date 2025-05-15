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
 *             properties:
 *               title:
 *                 type: string
 *                 example: Contaminación en el río
 *               description:
 *                 type: string
 *                 example: Se encontró basura en el río cerca del puente.
 *               location:
 *                 type: string
 *                 example: Zona 1, Ciudad
 *     responses:
 *       201:
 *         description: Reporte creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', authenticateToken, contaminationController.createReport);

/**
 * @swagger
 * /contamination-reports:
 *   get:
 *     summary: Obtener todos los reportes
 *     tags: [Contamination Reports]
 *     responses:
 *       200:
 *         description: Lista de reportes
 */
router.get('/', contaminationController.getAllReports);

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
router.get('/:id', contaminationController.getReportById);

/**
 * @swagger
 * /contamination-reports/{id}:
 *   put:
 *     summary: Actualizar un reporte
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
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reporte actualizado
 *       404:
 *         description: No encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', authenticateToken, contaminationController.updateReport);

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
 *         description: No encontrado
 */
router.delete('/:id', authenticateToken, contaminationController.deleteReport);

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
 *                 example: imagen123.jpg
 *     responses:
 *       200:
 *         description: Imagen agregada exitosamente
 *       400:
 *         description: Error al agregar imagen
 *       404:
 *         description: Reporte no encontrado
 */
router.post('/:id/images', authenticateToken, contaminationController.addImage);

module.exports = router;
