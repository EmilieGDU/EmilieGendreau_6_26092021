const express = require("express");

const router = express.Router();

// Importing sauces controller
const sauceCtrl = require("../controllers/sauces");


// Sauce routes
router.post("/", sauceCtrl.createSauce);
router.post("/:id/like", sauceCtrl.likeSauce);
router.put("/:id", sauceCtrl.modifySauce);
router.delete("/:id", sauceCtrl.deleteSauce);
router.get("/", sauceCtrl.getAllSauces);
router.get("/:id", sauceCtrl.getOneSauce);


module.exports = router;