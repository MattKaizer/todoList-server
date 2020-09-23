const Task = require('../models/Task');
const Project = require('../models/Projects');
const { validationResult } = require('express-validator');
const Projects = require('../models/Projects');

exports.createTask = async (req, res) => {

    // check errors
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    
    try {
        const { project } = req.body;
        const existentProject = await Projects.findById(project);
        if (!existentProject) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        // check project owner
        if (existentProject.author.toString() !== req.user.id) {
            res.status(401).json({msg: 'No autorizado'});
        }

        // create task
        const task = new Task(req.body);
        await task.save();
        res.json({task});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
    

}

// get task per project
exports.getTasks = async (req, res) => {        
    
    try {
        const { project } = req.body;
        const existentProject = await Projects.findById(project);
        if (!existentProject) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        // check project owner
        if (existentProject.author.toString() !== req.user.id) {
            res.status(401).json({msg: 'No autorizado'});
        }

        // get tasks per project
        const tasks = await Task.find({ project });
        res.json({tasks});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');        
    }

}