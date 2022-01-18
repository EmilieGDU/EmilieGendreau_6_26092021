const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const path = require("path");

// Importing routers
const utilisateursRoutes = require("./routes/utilisateurs");
const saucesRoutes = require("./routes/sauces");

// Loading environment variables (from .env file into process.env)
dotenv.config();


// Connection to the database with Mongoose package
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;
const HOST = process.env.DB_HOST;
const DATABASE = process.env.DB_NAME;
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`,
    {useNewUrlParser: true,
     useUnifiedTopology: true})
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch(() => console.log("Connexion à MongoDB échouée"));


// Creation of the Express app
const app = express();


// CORS error prevention (use method to apply to all routes)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});


// Allowing access to the body of the request contained in req.body 
app.use(express.json());

// express.static() inbuilt method to serve the files contained into the images directory for each request to the /images route
// path.join(__dirname, "images") to serve the absolute path (because the path provided must relate to the directory from which the Node process is started)
app.use("/images", express.static(path.join(__dirname, "images")));

// Setting security-related HTTP headers to protect the app from some web vulnerabilities
app.use(helmet());

// Registering routers for each main route of the application
app.use("/api/auth", utilisateursRoutes);
app.use("/api/sauces", saucesRoutes);


module.exports = app ;