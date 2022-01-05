const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true, min: 1, max: 10},
    likes: {type: Number},
    dislikes: {type: Number},
    // usersLiked: {type: [String], required: true},
    // usersLiked: {type: Array, required: true},
    // usersDisliked: {type: Array, required: true}
    usersLiked: [{type: String}],
    usersDisliked: [{type: String}]    
});

module.exports = mongoose.model("Sauce", sauceSchema);