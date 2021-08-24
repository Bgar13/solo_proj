const Thought = require('../models/thought.model');
const jwt = require('jsonwebtoken');


module.exports = {
    getAll: (req, res) => {
        Thought.find({})
            .sort({ thoughtDate : "descending" })
            .populate("user_id", "username email -_id")
            .then((allThoughts) => {
                console.log("in all thoughts");
                res.json(allThoughts);
            })
            .catch((err) => {
                console.log("error found in getAll");
                res.status(400).json(err);
        })
    },

    create: (req, res) => {
        console.log(req.body);
        const thought = new Thought(req.body);
        const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
    
        thought.user_id = decodedJwt.payload._id;
    
        Thought.create(thought)
            .then((newThought) => {
            console.log("in create");
            console.log(newThought);
            res.json(newThought);

            })
            .catch((err) => {
            console.log("error found in create");
            console.log(err);
            res.status(400).json(err);
            })
    },

        getOne: (req, res) => {
            console.log(req.params.id);
        
            Thought.findById(req.params.id)
            .populate("user_id", "username email -_id")
            .then((oneThought) => {
                console.log("in get one thought");
                res.json(oneThought);
            })
            .catch((err) => {
                console.log("error found in getOne");
                res.status(400).json(err);
            })
        },
        update: (req, res) => {
            console.log(req.params.id);
        
            Thought.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, 
            })
            .then((updatedThought) => {
                console.log("in update thought");
                res.json(updatedThought);
            })
            .catch((err) => {
                console.log("error found in update");
                res.status(400).json(err);
            })
        },
        
        delete: (req, res) => {
            console.log(req.params.id);
        
            Thought.findByIdAndDelete(req.params.id)
            .then((deletedThought) => {
                console.log("in delete thought");
                res.json(deletedThought);
            })
            .catch((err) => {
                console.log("error found in delete");
                res.status(400).json(err);
            })
        },
} 
        