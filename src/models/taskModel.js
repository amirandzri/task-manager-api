const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'Task title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value >= new Date();
            },
            message: 'Due date cannot be in the past',
        },
    },
}, {
    timestamps: true, //automatically add createdAt & updatedAt
});

module.exports = mongoose.model('Task', taskSchema);