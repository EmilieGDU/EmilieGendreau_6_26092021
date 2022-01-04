const mongoose = require("mongoose");

// Adding pre-save validation for unique fields within a Mongoose schema
// (2 users cannot have the same email address)
const uniqueValidator = require("mongoose-unique-validator");

const utilisateurSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// Application of the plugin uniqueValidator to the Schema before making a model
// Before saving a user, the unique validator will check for duplicate databases entries and report them like validation error
utilisateurSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Utilisateur", utilisateurSchema);