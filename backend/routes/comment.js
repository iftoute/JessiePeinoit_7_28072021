const express = require('express');
const router = express.Router();

// import du middleware auth
const auth = require('../middleware/auth');

// import du controller comment
const commentCtrl = require('../controllers/comment');

// routes pour les commentaires
router.post('/:postId', auth, commentCtrl.createComment);
router.get('/:postId', auth, commentCtrl.getAllComments);
router.delete('/:commentId', auth, commentCtrl.deleteComment);

// export du router
module.exports = router;