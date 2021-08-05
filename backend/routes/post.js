const express = require('express');
const router = express.Router();

// import des controllers post et like
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');


// routes pour les publications
router.post('', postCtrl.createPost);
router.post('/:postId/like', postCtrl.likePost);
router.get('', postCtrl.getAllPosts);
router.get('/:postId/like', postCtrl.getAllLikes);
router.put('/:postId', postCrtl.modifyPost);
router.delete('/:postId', postCtrl.deletePost);

// export du router
module.exports = router;