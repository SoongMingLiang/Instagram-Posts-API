//Import modules
const express = require('express');
const badWords = require('bad-words');
const { IgApiClient } = require('instagram-private-api');
const mongoose = require('mongoose');
//const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

//Some constants that will be used in the application
const instagramUsername = process.env.INSTAGRAM_USERNAME;
const instagramPassword = process.env.INSTAGRAM_PASSWORD;
const port = process.env.PORT || 5000;
const databaseUsername = process.env.DATABASE_USERNAME;
const databasePassword = process.env.DATABASE_PASSWORD;
const dbURI = `mongodb+srv://${databaseUsername}:${databasePassword}@instagram-posts.wf81a3n.mongodb.net/?retryWrites=true&w=majority`;

//Initialize express and middlewares
const app = express();
const filter = new badWords();
const ig = new IgApiClient();

//Listen to port once database connection is established
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port, () => console.log(`Available at http://localhost/${port}`)))
    .catch((err) => console.log(err));

//Connect to Instagram account
ig.state.generateDevice(instagramUsername);
ig.account.login(instagramUsername, instagramPassword)
    .then((result) => console.log("Log in successfully!"))
    .catch((err) => console.log(err));

//Direct to post route
//app.use('./post', postRoutes);