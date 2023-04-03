//Import modules
const badWords = require('bad-words');

//Initialize bad-words application
const filter = new badWords();

//Export bad-words application
module.exports = {
    filter
};