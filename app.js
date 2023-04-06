//Import modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {ig, connectToInstagram } = require('./middlewares/instagram');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

//Some constants that will be used in the application
const port = process.env.PORT || 5000;
const webApp = process.env.WEB_APP;
const localhost = process.env.LOCAL_HOST;
const databaseUsername = process.env.DATABASE_USERNAME;
const databasePassword = process.env.DATABASE_PASSWORD;
const dbURI = `mongodb+srv://${databaseUsername}:${databasePassword}@instagram-posts.wf81a3n.mongodb.net/?retryWrites=true&w=majority`;

//Initialize express
const app = express();

//Allow requests come from vue app that run locally
app.options('*', cors());
app.use(cors({
    origin: [webApp, localhost],
    methods: ["GET", "POST", "DELETE"]
}));

//Listen to port once database connection is established
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port, () => console.log(`Available at http://localhost:${port}`)))
    .catch((err) => console.log(err));

//For testing purpose (no connection to database and Instagram)
// app.listen(port, () => console.log(`Available at http://localhost:${port}`))

//Connect to Instagram account
connectToInstagram();

//Middleware to parse JSON object
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

//Direct to post route
app.use('/post', postRoutes);