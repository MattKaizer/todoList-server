const Projects = require('../models/Projects');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    // check errors
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }

    try {
        // create new project
        const project = new Projects(req.body);
        // add author to project
        project.author = req.user.id;
        // save project
        project.save();
        res.json({project});
        
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}

// get authenticated projects
exports.getProjects = async (req, res) => {
    try {
        // console.log(req.user)
        const projects = await Projects.find({ author: req.user.id});
        res.json({projects})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');
    }
}


exports.updateProject = async (req, res) => {
    // check errors
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }

    // extract info
    const { projectName } = req.body;
    const newProject = {};
    if(projectName) {
        newProject.projectName = projectName;
    }

    try {
        // check id
        let project = await Projects.findById(req.params.id);
        // check if project exist
        if (!project) {
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        // verify author
        if (project.author.toString() !== req.user.id) {
            res.status(401).json({msg: 'No autorizado'});
        }

        // update
        project = await Projects.findOneAndUpdate({ _id: req.params.id }, {$set: newProject}, {new: true});
        res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
}

exports.deleteProject = async (req, res) => {
    try {
        // check id
        let project = await Projects.findById(req.params.id);
        // check if project exist
        if (!project) {
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        // verify author
        if (project.author.toString() !== req.user.id) {
            res.status(401).json({msg: 'No autorizado'});
        }
        await Projects.findOneAndRemove( {_id: req.params.id});
        res.json({msg: 'Proyecto eliminado.'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}