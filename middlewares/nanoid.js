//Import modules
const { customAlphabet } = require('nanoid');
const { uppercase } = require('nanoid-dictionary');

//Initialize nanoid application
function uppercaseString(size){
    let twoCharacters = customAlphabet(uppercase, size); //customAlphabet returns a function
    return twoCharacters();
}

//Export nanoid application
module.exports = {
    uppercaseString
};