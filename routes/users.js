/* Routes for create user */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// /api/users
router.post('/',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe tener mínimo 8 caracteres').isLength({min: 8}),
        check('password', 'El password debe tener mínimo 8 caracteres, una mayúscula y un número').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
    ],
    userController.createUser
);

module.exports = router;