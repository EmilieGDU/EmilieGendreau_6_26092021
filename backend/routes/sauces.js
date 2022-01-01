const express = require("express");

const router = express.Router();

// Importing authentication middleware
const auth = require("../middleware/auth");
// Importing sauces controller
const sauceCtrl = require("../controllers/sauces");


// Sauce routes
router.post("/", auth, sauceCtrl.createSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);
router.put("/:id", auth, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);


module.exports = router;