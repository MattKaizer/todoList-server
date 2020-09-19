const Project = require('../models/Projects');

exports.createProject = async (req, res) => {
    try {
        // create new project
        const project = new Project(req.body);
        project.save();
        res.json(project);
        
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}