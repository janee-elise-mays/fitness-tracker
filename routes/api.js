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
// Currently throwing a 400(Bad Request) **NEEDS CORRECTED
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
// The Mongoose Aggregate constructor
    Workout.aggregate([
        // Parameters
    {$add: {
        totalDuration: {$sum: "$exercise.duration"},
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

router.get("/api/workouts", (req, res) => {
    Workout.find({})
    .then((workout) => {
    res.status(200).json(workout);
    })
    .catch((err) => {
        res.status(400).json(err.message);
    });
});

module.exports = router;
