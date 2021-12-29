const bcrypt = require("bcrypt");

// Importing Mongoose model
const Utilisateur = require("../models/Utilisateur");

exports.signup = (req, res, next) => {
    // Password encryption with salting over 10 turns
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const utilisateur = new Utilisateur({
            email: req.body.email,
            password: hash
        });
        utilisateur.save()
            .then(() => res.status(201).json({message: "Utilisateur créé." }))
            .catch((error) => res.status(400).json({error}));
    })
    .catch((error) => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    res.status(201).json({
        userId: "",
        token: ""
    });
};