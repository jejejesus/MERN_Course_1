const express = require('express');

// express router
const router = express.Router();

// GET all workouts
router.get('/', (req, res) => {
    res.json({message: "GET all workouts"});
});
// GET workout with id
router.get('/:id', (req, res) => {
    res.json({message: "GET workout with id " + req.params.id});
});
// POST new workout
router.post('/', (req, res) => {
    res.json({message: "POST new workout"});
});
// DELETE workout with id
router.delete('/:id', (req, res) => {
    res.json({message: "DELETE workout with id " + req.params.id});
});
// PATCH workout with id
router.patch('/:id', (req, res) => {
    res.json({message: "PATCH workout with id " + req.params.id});
});

module.exports = router;