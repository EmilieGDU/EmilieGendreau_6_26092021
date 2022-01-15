const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.tokenKey); 
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