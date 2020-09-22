const Task = require('../models/Task');
const Project = require('../models/Projects');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {

    // check errors
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }

    

}