//Import modules
const filter = require('../middlewares/badWord');
const { uppercaseString } = require('../middlewares/nanoid');

//Post id number
var idNum = 1000;

//Functions that will be used
const getNewPostID = (req, res) => {
    let header = uppercaseString(2);
    let id = '#' + header + idNum;
    console.log(id);
    idNum++;
    res.send(id);
}

//Controllers
const createNewPost = (req, res) => {
    console.log(req.body);
    res.send('Request accepted!')
}

//Exports controllers
module.exports = {
    //getNewPostID,
    createNewPost
}