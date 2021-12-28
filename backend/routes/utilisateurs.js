const express = require("express");

const router = express.Router();

// Importing utilisateurs controller
const utilisateurCtrl = require("../controllers/utilisateurs");


// Authentication routes
router.post("/signup", utilisateurCtrl.signup);
router.post("/login", utilisateurCtrl.login);


module.exports = router;