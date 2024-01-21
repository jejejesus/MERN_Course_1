require('dotenv').config();

// routers
const express = require('express');
const mongoose = require('mongoose');
const workoutsRouter = require('./routes/workouts');
const usersRouter = require('./routes/users');

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/workouts', workoutsRouter);
app.use('/api/users', usersRouter);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Server is listening on port", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
