/* Routes for user authentication */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// /api/auth - login session
router.post('/',
    authController.authUser
);

// get users
router.get('/',
    auth,
    authController.getAuthenticatedUser
);

module.exports = router;