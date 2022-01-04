const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // String to be replaced by a longer string for production (the same as the one used in the login function [controllers/utilisateurs.js])
        const userId = decodedToken.userId;
        req.auth = {userId: userId}; // Adding the userId (decoded from the token) to the request object
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable.";
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({error: error | "Requête non authentifiée."});
    }
};