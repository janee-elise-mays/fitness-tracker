const router = require("express").Router();
const Workout = require("../models/workout.js");


router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
    .then((workout) => {
        res.status(200).json(workout);
    })
    .catch((err) => {
        res.status(400).json(err.message);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate({_id: req.params.id},
        {$push: {exercises: body}},
        {new:true}
     )
        .then((workout) => {
            res.status(200).json(workout);
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

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(Workout => {
        res.status(200).json(Workout);
    })
    .catch((err) => {
         res.status(400).json(err.message);
    });
});

module.exports = router;
