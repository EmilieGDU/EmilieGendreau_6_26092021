const mongoose = require("mongoose");

// 2 users cannot have the same email address
const uniqueValidator = require("mongoose-unique-validator");

const utilisateurSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// Application of the plugin to the Schema before making a model
utilisateurSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Utilisateur", utilisateurSchema);