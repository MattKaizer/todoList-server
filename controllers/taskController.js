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
        const { project } = req.query;
        const existentProject = await Projects.findById(project);
        if (!existentProject) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        // check project owner
        if (existentProject.author.toString() !== req.user.id) {
            res.status(401).json({msg: 'No autorizado'});
        }

        // get tasks per project
        const tasks = await Task.find({ project }).sort({createdAt: -1});
        res.json({tasks});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');        
    }

}

exports.updateTask = async (req, res) => {
    // check errors
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }

    try {
        const { project, name, state } = req.body;

        
        // check if task exist
        let task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).json({msg: 'No existe la tarea.'})
        }
        
        // check project owner
        const existentProject = await Projects.findById(project);
        if (existentProject.author.toString() !== req.user.id) {
            res.status(401).json({msg: 'No autorizado'});
        }
        const newTask = {};
        if(name) {
            newTask.name = name;
        }
        newTask.state = state;
        // save Task
        task = await Task.findOneAndUpdate({ _id: req.params.id }, {$set: newTask }, {new: true} );
        res.json({task});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');           
    }
}

exports.deleteTask = async (req, res) => {
        // check errors
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()})
        }
    
        try {
            const { project, name, state } = req.query;
    
            
            // check if task exist
            let existentTask = await Task.findById(req.params.id);
            if (!existentTask) {
                res.status(404).json({msg: 'No existe la tarea.'})
            }
            
            // check project owner
            const existentProject = await Projects.findById(project);
            if (existentProject.author.toString() !== req.user.id) {
                res.status(401).json({msg: 'No autorizado'});
            }
            // delete
            await Task.findOneAndDelete({_id: req.params.id});
            res.json({msg: 'Tarea eliminada.'});
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');           
        }
}