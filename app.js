//Import modules
const express = require('express');
const badWords = require('bad-words');
const mongoose = require('mongoose');
const {ig, connectToInstagram } = require('./instagram');
//const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

//Some constants that will be used in the application
const port = process.env.PORT || 5000;
const databaseUsername = process.env.DATABASE_USERNAME;
const databasePassword = process.env.DATABASE_PASSWORD;
const dbURI = `mongodb+srv://${databaseUsername}:${databasePassword}@instagram-posts.wf81a3n.mongodb.net/?retryWrites=true&w=majority`;

//Initialize express and middlewares
const app = express();
const filter = new badWords();

//Listen to port once database connection is established
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port, () => console.log(`Available at http://localhost/${port}`)))
    .catch((err) => console.log(err));

//Connect to Instagram account
connectToInstagram();

//Direct to post route
//app.use('./post', postRoutes);