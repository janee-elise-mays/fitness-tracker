const router = require("express").Router();
const Workout = require("../models/workout.js");


router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then((dbWorkout) => {
        res.status(200).json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err.message);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate({_id: req.params.id},
        {$push: {exercises: req.body}},
        {new:true}
     )
        .then((dbWorkout) => {
            res.status(200).json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

router.get("/api/workouts", (req, res) => {
// Aggregate constructor used for building aggregation pipelines.
    Workout.aggregate([
// Adds new fields to documents. $addFields outputs documents that contain all existing fields from the input documents and newly added fields.
    {
        $addFields: {
// Calculates and returns the sum of numeric values. $sum ignores non-numeric values.
        totalDuration: { $sum: "$exercise.duration"},
    },
    },
])
    .then((dbWorkout) => {
    res.status(200).json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err.message);
    });
});

router.get("/api/workouts/range", (req, res) => {
// Aggregate constructor used for building aggregation pipelines.
    Workout.aggregate([  
        {$sort: {day: -1}},
        {
// Adds new fields to documents. $addFields outputs documents that contain all existing fields from the input documents and newly added fields.
        $addFields: {
// Calculates and returns the sum of numeric values. $sum ignores non-numeric values.
            totalDuration: {$sum: "$exercise.duration"}}}
 ])
    .then((dbWorkout) => {
    res.status(200).json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err.message);
    });
});

module.exports = router;
