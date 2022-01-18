// Importing Mongoose model (to facilitate interactions with the database)
const Sauce = require("../models/Sauce"); 
// Importing the NodeJS fs module (to access and interact with the file system)
const fs = require("fs"); 


// ################################################################
// CRUD Implementation with exploitation of the Mongoose data model
// ################################################################

// C like CREATE 

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({message: "Sauce enregistrée."}))
        .catch((error) => res.status(400).json({error}));
};


// R like READ

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({error}));
};


exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(400).json({error}));
};


// U like UPDATE

exports.modifySauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (!sauce) {
                return res.status(400).json({error: new Error("Sauce non trouvée.")});
            }
            // Only the owner of the sauce should be able to modify it
            // So, we check if the user making the request is the owner of the sauce
            if (sauce.userId !== req.auth.userId) {
                return res.status(403).json({error: new Error("Requête non autorisée.")});
            } 
            else {
                if (req.file) {
                    const filename = sauce.imageUrl.split("/images/")[1];
                    fs.unlinkSync(`images/${filename}`);
                }
            }   
            
            const sauceObject = req.file ?
            {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            } : {
                ...req.body
            };    
            
            Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message: "Sauce modifiée."}))
                .catch((error) => res.status(400).json({error}));
        })
        .catch((error) => res.status(400).json({error}));
};


// D like DELETE

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (!sauce) {
                return res.status(400).json({error: new Error("Sauce non trouvée.")});
            }
            // Only the owner of the sauce should be able to delete it
            // We check if the user making the request is the owner of the sauce
            if (sauce.userId !== req.auth.userId) {
                return res.status(403).json({error: new Error("Requête non autorisée.")});
            }
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: "Sauce supprimée."}))
                .catch((error) => res.status(400).json({error}));
            });            
        })
        .catch((error) => res.status(400).json({error}));
};


// ###########################
// Like/Dislike Implementation
// ###########################

exports.likeSauce = (req, res, next) => {    
    const like = req.body.like;
    const userId = req.body.userId;    
    switch (like) {
        case 1 :
            // $inc : allows to increment or decrement an existing numeric field in MongoDB
            // $push : allows to add a new element to an array in MongoDB
            Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: userId}})
                .then(() => res.status(200).json({message : "Vous aimez cette sauce."}))
                .catch((error) => res.status(400).json({error}));
            break;
        case -1 :
            Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: userId}})
                .then(() => res.status(200).json({message: "Vous n'aimez pas cette sauce."}))
                .catch((error) => res.status(400).json({error}));
            break;
        case 0 :                 
            // $pull : allows to delete an array element in MongoDB
            Sauce.findOne({_id: req.params.id})
                .then((sauce) => {
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: userId}})
                            .then(() => res.status(200).json({message: "Votre vote pour cette sauce a été annulé."}))
                            .catch((error) => res.status(400).json({error}));
                    }
                    else if (sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: userId}})
                            .then(() => res.status(200).json({message: "Votre vote pour cette sauce a été annulé."}))
                            .catch((error) => res.status(400).json({error}));
                    };
                })
                .catch((error) => res.status(400).json({error}));
    }
};