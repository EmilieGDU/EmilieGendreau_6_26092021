const passwordValidator = require("password-validator");

// Creating password schema
const passwordSchema = new passwordValidator();

// Implementing a strict password schema
passwordSchema
    .is().min(5)                                    // Minimum length 5
    .is().max(15)                                   // Maximum length 10
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces

// Checking the validity of the password
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res
            .status(400)
            .json({error : "Le mot de passe doit contenir entre 5 et 15 caractères, au minimum une majuscule et 2 chiffres, et ne comporter aucun espace."});
            //.json({error: `Le mot de passe est trop faible ${passwordSchema.validate((req.body.password), {details: true})}`});
    }
};