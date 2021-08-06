const jwt = require("jsonwebtoken");
const db = require('../models/index');


// liker un message
exports.likePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isLiked = req.body.like
    
    db.Post.findOne({
      
        where: { id: req.params.postId },
    })

    .then(postfound => {
        if(!postfound) {
            return res.status(404).json({ error: 'Le message n\'a pas été trouvé' })
        } else if (isLiked == false) {
            db.Like.create({ 
                postId: req.params.postId, 
                userId: userId 
            })
            .then(response => {
                console.log(postfound.likes);
                
                db.Post.update({ 
                    likes: postfound.likes +1
                },{
                    where: { id: req.params.postId }
                })
                .then(() => res.status(201).json({ message: 'Vous aimez ce message !' }))
                .catch(error => res.status(500).json({ error: 'Une erreur est survenue' })) 
            })
            .catch(error => res.status(400).json({ error: 'Une erreur est survenue' }))
        } else if(isliked == true) {
            db.Like.destroy({ 
                where: { 
                    postId: req.params.postId, 
                    userId: userId 
                } 
            })
            .then(() => {
                db.Post.update({ 
                    likes: postfound.likes -1
                },{
                    where: { id: req.params.postId }
                })
                .then(() => res.status(201).json({ message: 'Vous n\'aimez plus ce message' }))
                .catch(error => res.status(500).json({ error: 'Une erreur est survenue' })) 
            })
            .catch(error => res.status(400).json({ error: 'Une erreur est survenue' }))
        } else {
            console.log('ko');
        }
    })
    .catch(error => res.status(400).json({ error: 'Une erreur est survenue' }))  
}

// affichage de tous les likes pour un message
exports.getAllLikes = (req, res, next) => {
    db.Like.findAll({
        where: { postId: req.params.postId},
        include: {
            model: db.User,
            attributes: ["userName"]
        },
    })
    .then(likePostFound => {
        if(likePostFound) {
            res.status(200).json(likePostFound);
            console.log(likePostFound);
        } else {
            res.status(404).json({ error: 'Aucun like trouvé' });
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur est survenue' }))
}
