const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Endpoint de prueba
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.get('/', (req, res) => {
  res.send('Hola desde /test');
});

module.exports = router;
