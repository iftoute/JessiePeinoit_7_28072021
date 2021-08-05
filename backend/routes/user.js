const express = require('express');
const router = express.Router();

// import du controller users
const userCtrl = require('../controllers/user');

// routes pour les utilisateur
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getUserProfile);
router.put('/:id', userCrtl.modifyProfile);
router.delete('/:id', userCtrl.deleteAccount);

// export du router
module.exports = router;