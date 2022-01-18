const express = require("express");

// Creating an Express router
const router = express.Router();

// Importing middlewares
const passwordValidator = require("../middleware/password_validator")
const rateLimit = require("../middleware/rate_limit");


// Importing utilisateurs controller
const utilisateurCtrl = require("../controllers/utilisateurs");


// Implementing individuals routes in the router
// Applying middlewares and assigning controller functions
router.post("/signup", passwordValidator, utilisateurCtrl.signup);
router.post("/login", rateLimit, utilisateurCtrl.login);


module.exports = router;