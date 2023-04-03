//Import modules
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const stringPixelWidth = require('string-pixel-width');

//Some constants will be used
const width = 1080;
const height = 1080;
const template = path.join(__dirname, '../public/template.jpg');

//Initialize canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

//Function to split incoming context to several lines
const splitLines = (content) => {
    const maxWidth = 1000;
    const fontSize = 48;
    const fontFamily = 'sans-serif';

    let start = 0;
    let chunks = '';

    for (let i = 0; i < content.length; i++) {
        const chunkWidth = stringPixelWidth(content.substring(start, i + 1), { fontSize, fontFamily });

        if (chunkWidth > maxWidth) {
            chunks += content.substring(start, i) + '\n';
            start = i;
        }
    }
    chunks += content.substring(start);

    return chunks;
}

//Function to generate image
const generateImage = async (content) => {
    content = splitLines(content);
    const image = await loadImage(template);
    ctx.drawImage(image, 0, 0, width, height);
    ctx.fillStyle = 'black';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(content, canvas.width/2, canvas.height/2);
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync('image.png', buffer);
    return buffer;
}

//Export canvas application
module.exports = {
    generateImage
};