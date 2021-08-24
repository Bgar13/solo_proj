const mongoose = require('mongoose');

const ThoughtSchema = new mongoose.Schema({
    myThought:{
        type: String,
        required : [true, "your thought of the day is required"],
        minLenght : [2, "Thought has to be more than 2 characters long"],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "A user id is required to create a thought",

    },
    mood: {
        type: String,
        required: [ true, "Mood is required" ],
        // give a list of all the valid values in this array
        // Adventure, Family, Fantasy, Romance, 
        enum: [ 
          'Happy', 
          'Sad',
          'Angry',
          'Disappointed',
          'Indifferent', 
          'Humorous', 
          'Gloomy', 
          'Romantic',
          'Lighthearted',
          'Lonely', 
        ],
      },

},{timestamps : true})

const Thought = mongoose.model("Thought", ThoughtSchema);

module.exports = Thought; 
