/* Routes for create tasks */
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// /api/tasks
router.post('/',
    auth,
    [
        check('name', 'El nombre es obligatorio.').notEmpty(),
        check('project', 'El proyecto es obligatorio.').notEmpty()
    ],
    taskController.createTask
);

module.exports = router;