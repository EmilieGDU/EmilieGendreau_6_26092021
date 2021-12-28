const express = require("express");

const router = express.Router();

// Importing Mongoose model
const Utilisateur = require("../models/Utilisateur");


// Authentication routes
router.post("/signup", (req, res, next) => {
    res.status(201).json({
        message: ""
    });
});

router.post("/login", (req, res, next) => {
    res.status(201).json({
        userId: "",
        token: ""
    });
});

module.exports = router;