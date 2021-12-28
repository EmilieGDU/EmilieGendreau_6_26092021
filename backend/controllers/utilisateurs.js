// Importing Mongoose model
const Utilisateur = require("../models/Utilisateur");

exports.signup = (req, res, next) => {
    res.status(201).json({
        message: ""
    });
};

exports.login = (req, res, next) => {
    res.status(201).json({
        userId: "",
        token: ""
    });
};