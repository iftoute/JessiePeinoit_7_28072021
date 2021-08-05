const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config(); 


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

// Permet d'importer les routers user, post 
const userRoutes = require('./routes/user');

// Permet d'accéder aux routes pour les utilisateurs, les publications et les images
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


module.exports = app;