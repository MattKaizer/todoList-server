/* Routes for user authentication */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// /api/auth
router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe tener mínimo 8 caracteres').isLength({min: 8}),
        check('password', 'El password debe tener mínimo 8 caracteres, una mayúscula y un número').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
    ],
    authController.authUser
);

// get users
router.get('/',
    auth,
    authController.getAuthenticatedUser
);

module.exports = router;