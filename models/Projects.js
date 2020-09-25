const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Project', projectSchema);
