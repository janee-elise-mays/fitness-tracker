const router = require("express").Router();
const db = require("../models/workout.js");


router.post("/api/workout", (req, res) => {
    db.Workout.create(req.body)
    .then((workout) => {
        res.status(200).json(workout);
    })
    .catch((err) => {
        res.status(400).json(err.message);
    });
});

router.put("/api/workout/:id", ({ body, params}, res) => {
    db.Workout.findByIdAndUpdate(params.id,
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

router.get("/api/workout", (req, res) => {
    db.Workout.find({})
    .then((workout) => {
    res.status(200).json(workout);
    })
    .catch((err) => {
        res.status(400).json(err.message);
    });
});

router.get("/api/workout", (req, res) => {
    db.Workout.find({})
    .then((workout) => {
    res.status(200).json(workout);
    })
    .catch((err) => {
        res.status(400).json(err.message);
    });
});

module.exports = router;
