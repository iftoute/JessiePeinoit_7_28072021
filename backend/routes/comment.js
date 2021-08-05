const express = require('express');
const router = express.Router();

// import du controller comment
const commentCtrl = require('../controllers/comment');

// routes pour les commentaires
router.post('/:postId', commentCtrl.createComment);
router.get('/:postId', commentCtrl.getAllComments);
router.delete('/:commentId', commentCtrl.deleteComment);

// export du router
module.exports = router;