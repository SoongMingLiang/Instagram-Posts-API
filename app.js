//Import modules
const express = require('express');
const badWords = require('bad-words');
require('dotenv').config();

//Some constants that will be used in the application
const username = process.env.INSTAGRAM_USERNAME;
const password = process.env.INSTAGRAM_PASSWORD;
const port = process.env.PORT || 5000;

//Initialize express and middlewares
const app = express();
const filter = new badWords();

//Connect to database and listen to port after it is connected
