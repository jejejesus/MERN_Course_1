const express = require('express');
const {
    createWorkout,
    getWorkoutById,
    getAllWorkouts,
    deleteWorkoutById,
    updateWorkoutById
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

// express router
const router = express.Router();
// require authentication for all workout routes
router.use(requireAuth);

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