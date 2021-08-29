const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/index');

// import du modèle de données pour les utilisateurs
const User = require('../models/User');

// import de validator pour valider les entrées utilisateurs
const validator = require('validator');

const passwordValidator = require('password-validator');

// création du schéma de validation du mot de passe
const schemaPassword = new passwordValidator();

// schéma du mot de passe utilisateur
schemaPassword
.is().min(8)                                    // Minimum 8 caractères
.is().max(20)                                   // Maximum 20 caractères
.has().uppercase()                              // Doit avoir une majuscule
.has().lowercase()                              // Doit avoir une minuscule
.has().digits(2)                                // Doit avoir au moins 2 chiffres
.has().symbols(1)                               // Doit avoir un caractère spécial
.has().not().spaces();                          // Ne doit pas inclure d'espace

// création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    console.log(userName);
     // vérification de la conformité du mot de passe
        if (!validator.isStrongPassword(password)) {
            console.log(password);
            return res.status(400).json({ error: 'Le mot de passe doit contenir entre 8 et 20 caractères dont au moins une majuscule, une minusucle, deux chiffres et un caractère spécial'})
   }
    // vérification pour savoir si l'utilisateur existe déjà dans la db

    db.User.findOne({
    where: { 
        userName: userName,
        email: email
    },
    attributes: [ 'userName' || 'email']
    })
    .then(userExist => {
        console.log(userExist);
        // si l'utilisateur n'existe pas on hash le mot de passe avant de l'enregistrer dans la db
        if (!userExist) {
            bcrypt.hash(req.body.password, 10)   
            .then (hash => {
                const user = db.User.build({
                    userName: userName,
                    email: email,
                    password: hash,
                    isAdmin: 0
                }, console.log(hash));
                user.save()
                    .then(() => res.status(201).json({ message: 'Votre compte a bien été créé' }))
                    .catch(error => res.status(400).json({ error : 'échec de la création du compte'}));
            })
            .catch(error => res.status(500).json({ message: 'erreur d\'inscription' }));
        } else {
            return res.status(404).json({ error: 'Ce compte existe déjà' })
        }
    })
    .catch(error => res.status(500).json({ error: 'impossible de créer ce compte' }));
}



// connexion d'un utilisateur déjà inscrit
exports.login = (req, res, next) => {
    // recherche le user dans la base de donnée qui correspond à l'adresse mail de la requête
    db.User.findOne({ 
        where: { email: req.body.email }
    })
    .then(user => {
        // si le user est trouvé, le mot de passe entré par l'utilisateur est comparé avec celui enregistré dans la db
        if (user) {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    id: user.id,
                    isAdmin: user.isAdmin,
                    userName: user.userName,
                    imageUrl: user.imageUrl,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(404).json({ error: 'Cet utilisateur n\'existe pas, veuillez créer un compte'})
        }
    })
    .catch(error => res.status(500).json({ error }));
}

// Accès au profil de l'utilisateur
exports.getUserProfile = (req, res, next) => {
    const id = req.params.id;
    const email = req.body.email;
    const password = req.body.password;

    db.User.findOne({
        where: { 
            id: id,
            email: email
        },
        attributes: [ 'id' || 'email']
        })
    .then(user => {
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
    .catch(error => res.status(404).json({ error }));
}

// modification du profil par l'utilisateur
exports.modifyUserProfile = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    req.body.user = userId
    
    const userObject = req.file ?
    {
    ...JSON.parse(req.body.user),
    imageProfile: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    
    db.User.findOne({
        where: { id: userId },
    })
    .then(userFound => {
        if(userFound) {
            db.User.update(userObject, {
                where: { id: userId}
            })
            .then(user => res.status(200).json({ message: 'Votre profil a bien été modifié' }))
            .catch(error => res.status(400).json({ error }))
        }
        else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    })
    .catch(error => res.status(500).json({ error }));
}

// Suppression d'un compte utilisateur
exports.deleteAccount = (req, res, next) => {
    const id = req.params.id;
    db.User.findOne({
        attributes: ['id'],
        where: { id: id }
    })
    .then(user => {
        if(user) {
            db.User.destroy({ 
                where: { id: id } 
            })
            .then(() => res.status(200).json({ message: 'Votre compte a bien été supprimé' }))
            .catch(() => res.status(500).json({ error }));
            
        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
    .catch(error => res.status(500).json({ error }));
}