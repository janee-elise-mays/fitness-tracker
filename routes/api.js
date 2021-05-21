const router = require("express").Router();
const db = require("../models/activity.js");


router.post("/api/workout", ({ body }, res) => {
    
});

router.post("/api/workout/bulk", ({ body }, res) => {
    
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
