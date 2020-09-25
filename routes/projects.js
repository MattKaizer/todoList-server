const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// create projects - /api/projects
router.post('/',
    auth,
    [
        check('projectName', 'El nombre del proyecto es obligatorio.').notEmpty()
    ],
    projectController.createProject
);
// get all projects - /api/projects
router.get('/',
    auth,
    projectController.getProjects
);
// update
router.put('/:id',
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio.').notEmpty()
    ],
    projectController.updateProject
);

router.delete('/:id',
    auth,
    projectController.deleteProject
);

module.exports = router;