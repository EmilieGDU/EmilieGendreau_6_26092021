const mongoose = require("mongoose");

const utilisateurSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String}
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);