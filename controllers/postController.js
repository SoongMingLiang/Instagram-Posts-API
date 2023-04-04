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
const getMediaID = async (postID) => {
    const timelineFeed = ig.feed.timeline();
    const feedItems = await timelineFeed.items();

    for(const item of feedItems){
        const caption = item.caption?.text;
        if(caption.includes(postID)){
            const mediaID = item.id;
            return mediaID;
        }
    }
}
const postToInstagram = async (id, image) => {
    await ig.publish.photo({
        file: image,
        caption: id,
    });
    console.log('Post have been posted to Instagram!');
}
const deleteFromInstagram = async (mediaID) => {
    await ig.media.delete({
        mediaId: mediaID,
    });
    console.log('Post have been deleted from Instagram!');
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
        await newPost.save();
        console.log('Post saved!');
    }
    catch(err){
        console.log('Error while save to database');
        console.log(err);
    }

    //Clean out those bad-words (if have any)
    content = filter.clean(content);

    try{
        let image = await generateImage(content);
        await postToInstagram(id, image);
    }
    catch(err){
        console.log('Error while post to Instagram');
        console.log(err);
    }
    res.send('Post request accepted!');
}

const deletePost = async (req, res) => {
    let postID = req.params.id;
    postID = '#' + postID;
    console.log(postID);
    try{
        await Post.findOneAndDelete({ id: postID });
        console.log(`post ID: ${postID} has been deleted from database`);
    }
    catch(err){
        console.log('Error while delete from database');
        console.log(err);
    }
    try{
        let mediaID = await getMediaID(postID);
        await deleteFromInstagram(mediaID);
    }
    catch(err){
        console.log('Error while delete from Instagram');
        console.log(err);
    }
    res.send('Delete request accepted!');
}

//Exports controllers
module.exports = {
    createNewPost,
    deletePost
}