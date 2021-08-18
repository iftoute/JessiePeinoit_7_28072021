const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config(); 
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

// Permet d'importer les routers user, post 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/user');
const commentRoutes = require('./routes/user');

// Permet d'accéder aux routes pour les utilisateurs, les publications et les images
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


module.exports = app;