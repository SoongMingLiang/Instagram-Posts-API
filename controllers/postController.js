//Import modules
const fs = require('fs');
const path = require('path');
const Post = require('../models/post');
const { filter } = require('../middlewares/badWord');
const { generateImage } = require('../middlewares/canvas');
const { ig, connectToInstagram } = require('../middlewares/instagram');
const { uppercaseString } = require('../middlewares/nanoid');

//Post id number
var idNum = 1000;

//Functions that will be used
const getNewPostID = () => {
    let header = uppercaseString(2);
    let id = '#' + header + idNum;
    idNum++;
    return id;
}
const postToInstagram = async (id, content) => {
    let image = await generateImage(content);
    // await ig.publish.photo({
    //     file: image,
    //     caption: id,
    // });
    console.log('Post have been posted to Instagram!');
}

//Controllers
const createNewPost = async (req, res) => {
    let id = getNewPostID();
    let content = req.body.content;
    let newPost = Post({
        id: id,
        content: content
    });
    try{
        //await newPost.save();
        console.log('Post saved!');
    }
    catch(err){
        console.log('Error while save to database');
        console.log(err);
    }
    content = filter.clean(content);
    try{
        await postToInstagram(id, content);
    }
    catch(err){
        console.log('Error while post to Instagram');
        console.log(err);
    }
    res.send('Request accepted!');
}

//Exports controllers
module.exports = {
    createNewPost
}