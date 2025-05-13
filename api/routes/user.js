const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  signupUser,
  loginUser
} = require('../controller/user');

// Rutas protegidas
router.post('/', checkAuth, createUser);           // Crear usuario (admin/moderador)
router.get('/', checkAuth, getAllUsers);           // Obtener todos los usuarios
router.get('/:id', checkAuth, getUserById);        // Obtener usuario por ID
router.put('/:id', checkAuth, updateUser);         // Actualizar usuario
router.delete('/:id', checkAuth, deleteUser);      // Eliminar usuario

// Rutas públicas
router.post('/signup', signupUser);                // Registro público
router.post('/login', loginUser);                  // Login público

module.exports = router;