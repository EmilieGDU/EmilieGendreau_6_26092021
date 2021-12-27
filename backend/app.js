const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Importing Mongoose models
const Utilisateur = require("./models/Utilisateur");
const Sauce = require("./models/Sauce");

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

// Authentication routes
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

// Sauce routes
app.post("/api/sauces", (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({message: "Sauce enregistrée."}))
        .catch((error) => res.status(400).json({error}));
});

app.post("/api/sauces/:id/like", (req, res, next) => {
    res.status(201).json({
        message: ""
    });
});


app.put("/api/sauces/:id", (req, res, next) => {
    Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: "Sauce modifiée."}))
        .catch((error) => res.status(400).json({error}));
});


app.delete("/api/sauces/:id", (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "Sauce supprimée."}))
        .catch((error) => res.status(400).json({error}));
});


app.get("/api/sauces", (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({error}));
});

app.get("/api/sauces/:id", (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({error}));
});

module.exports = app ;