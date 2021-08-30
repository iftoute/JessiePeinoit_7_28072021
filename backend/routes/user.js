const express = require('express');
const router = express.Router();

// import du controller users
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

// import des middlewares
const auth = require('../middleware/auth');

// routes pour les utilisateur
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', /*auth,*/ multer, userCtrl.getUserProfile);
router.put('/:id', auth, multer, userCtrl.modifyUserProfile);
router.delete('/:id', auth, userCtrl.deleteAccount);

// export du router
module.exports = router;