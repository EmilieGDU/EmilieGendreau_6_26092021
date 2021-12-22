const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Loading environment variables (from .env file into process.env)
dotenv.config();

// Connection to the database
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;
const HOST = process.env.DB_HOST;
const DATABASE = process.env.DB_NAME;
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`,
    {useNewUrlParser: true,
     useUnifiedTopology: true})
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch(() => console.log("Connexion à MongoDB échouée"));


const app = express();

// express.json() inbuilt method to recognize the incoming request object as a JSON object, and to allow access to the body of the request contained in req.body 
app.use(express.json());

// CORS error prevention (use method to apply to all routes)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// Routes
app.use("/endpoint", (req, res, next) => { // Endpoint = route pour laquelle nous souhaitons enregistrer cet élément de middleware = URL demandée par l'application frontend
    // Création des objets à renvoyer selon le schéma de données spécifique requis par le frontend
    const objetARenvoyer = {

    };
    // Ajout du code de statut à l'objet response et renvoi des données sous forme de JSON
    res.status(XXX).json(objetARenvoyer);
});

app.post("/api/auth/signup", (req, res, next) => {
    res.status(201).json({
        message: ""
    });
});

app.post("/api/auth/login", (req, res, next) => {
    res.status(201).json({
        userId: "",
        token: ""
    });
});

app.post("/api/sauces", (req, res, next) => {
    res.status(201).json({
        message: ""
    });
});

app.post("/api/sauces/:id/like", (req, res, next) => {
    res.status(201).json({
        message: ""
    });
});


app.get("/api/sauces", (req, res, next) => {
    const sauces = [];
    res.status(200).json(sauces);
});

app.get("/api/sauces/:id", (req, res, next) => {
    const sauce = {};
    res.status(200).json(sauce);
});

module.exports = app ;