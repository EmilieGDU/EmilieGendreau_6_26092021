const express = require("express");

// Creating an Express router
const router = express.Router();

// Importing utilisateurs controller
const utilisateurCtrl = require("../controllers/utilisateurs");


// Implementing individuals routes in the router
router.post("/signup", utilisateurCtrl.signup);
router.post("/login", utilisateurCtrl.login);


module.exports = router;