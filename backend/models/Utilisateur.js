const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Implementing a strict data schema
const utilisateurSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// Adding pre-save validation for unique fields within a Mongoose schema (2 users cannot have the same email address)
// Application of the plugin to the Schema before making a model
// Before saving a user, the unique validator will check for duplicate databases entries and report them like validation error
utilisateurSchema.plugin(uniqueValidator);

// Exporting the fully configured model
module.exports = mongoose.model("Utilisateur", utilisateurSchema);