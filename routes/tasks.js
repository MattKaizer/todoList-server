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

// /api/tasks - get all task
router.get('/',
    auth,
    taskController.getTasks
)

// update
router.put('/:id', 
    auth,
    taskController.updateTask
)

// delete
router.delete('/:id',
    auth,
    taskController.deleteTask
)

module.exports = router;