const express = require('express');
const router = express.Router();

// import des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// import des controllers post et like
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');

// routes pour les publications
router.post('', auth, multer, postCtrl.createPost);
router.get('', auth, multer, postCtrl.getAllPosts);
router.put('/:postId', auth, multer, postCrtl.modifyPost);
router.delete('/:postId', auth, multer, postCtrl.deletePost);

// routes pour les likes
router.post('/:postId/like', auth, postCtrl.likePost);
router.get('/:postId/like', auth, postCtrl.getAllLikes);

// export du router
module.exports = router;