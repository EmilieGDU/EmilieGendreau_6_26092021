const express = require("express");

// Creating an Express router
const router = express.Router();

// Importing middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Importing sauces controller
const sauceCtrl = require("../controllers/sauces");


// Implementing individuals routes in the router
// Applying middlewares and assigning controller functions
router.post("/", auth, multer, sauceCtrl.createSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);


module.exports = router;