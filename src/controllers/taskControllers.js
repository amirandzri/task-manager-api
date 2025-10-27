const Task = require('../models/taskModel');

//@desc Get all tasks
//@route Get /api/tasks
const getTasks = async (req,res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//@desc Create new task
//@route POST /api/tasks
const createTask = async (req,res) => {
    try{
        const {title, description} = req.body;

        //validation
        if (!title) {
            return res.status(400).json({message: 'Title is required'});
        }

        const newTask = await Task.create({title, description});
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//@desc Update task
//@route PUT /api/tasks/:id
const updateTask = async(req,res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {new: true})

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//@desc Delete task
//@route DELETE /api/tasks/:id
const deleteTask = async (req,res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found'})
        }

        res.status(200).json({message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };