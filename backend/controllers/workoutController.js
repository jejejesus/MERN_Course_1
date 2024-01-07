const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const user_id = req.user._id;
        const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// GET workout with id
const getWorkoutById = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No workout with that id' });
    }
    try {
        const workout = await Workout.findById(id);
        res.status(200).json(workout);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

// POST new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    let emptyFields = [];
    if (!title) emptyFields.push('Title');
    if (!reps) emptyFields.push('Reps');
    if (!load) emptyFields.push('Load');
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${emptyFields.join(', ')}` });
    }

    // add document to db
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ title, reps, load, user_id });
        res.status(201).json(workout);
    } catch (err) {
        res.status(400).json({ error: err.message} );
    }
};

// DELETE workout with id
const deleteWorkoutById = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No workout with that id' });
    }
    try {
        const workout = await Workout.findByIdAndDelete(id);
        res.status(200).json(workout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// PATCH workout with id
const updateWorkoutById = async (req, res) => {
    const {id} = req.params;
    const {title, reps, load} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No workout with that id' });
    }
    try {
        const workout = await Workout.findByIdAndUpdate(id, { ...req.body });
        res.status(200).json(workout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllWorkouts,
    getWorkoutById,
    createWorkout,
    deleteWorkoutById,
    updateWorkoutById
}