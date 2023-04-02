//Import modules
const { IgApiClient } = require('instagram-private-api');
require('dotenv').config();

//Some constants that will be used in the application
const instagramUsername = process.env.INSTAGRAM_USERNAME;
const instagramPassword = process.env.INSTAGRAM_PASSWORD;

//Initialize instagram API client
const ig = new IgApiClient();

//Connect to Instagram account
const connectToInstagram = async () => {
    ig.state.generateDevice(instagramUsername);
    try{
        let result = await ig.account.login(instagramUsername, instagramPassword);
        if(result){
            console.log("Instagram account log in successfully!");
        }
    }
    catch(err){
        console.log(err);
    }
}

//Export instagram account connection
module.exports = {
    ig,
    connectToInstagram
};