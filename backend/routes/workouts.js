const express = require('express');
const {
    createWorkout, getWorkoutById, getAllWorkouts, deleteWorkoutById, updateWorkoutById
} = require('../controllers/workoutController')

// express router
const router = express.Router();

// GET all workouts
router.get('/', getAllWorkouts);

// GET workout with id
router.get('/:id', getWorkoutById);

// POST new workout
router.post('/', createWorkout);

// DELETE workout with id
router.delete('/:id', deleteWorkoutById);

// PATCH workout with id
router.patch('/:id', updateWorkoutById);

module.exports = router;