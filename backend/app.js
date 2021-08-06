const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config(); 
const mysql = require('mysql2');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});


// Permet d'importer les routers user, post 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/user');
const commentRoutes = require('./routes/user');

// Permet d'accéder aux routes pour les utilisateurs, les publications et les images
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


module.exports = app;