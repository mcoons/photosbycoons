const express = require('express');
const app = express();
const fs = require('fs');
// const EXIF = require('exif-js');

const localPort = 3002;
const port = process.env.PORT || localPort;

const picsFolder = 'public/images';
const DOMpath = 'images';

var genres = [];
var gamePics = {};

app.locals.siteTitle = 'Pictures by Coons';

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/pictures'));

genres = fs.readdirSync(picsFolder);
if (genres[0] = ".DS_Store") genres.shift();

app.set('genres', genres);

genres.forEach( date => {
    if (date != '.DS_Store' && date != 'gameinfo.JSON') {
        let gameData = [];
        let files = fs.readdirSync(picsFolder+'/'+date);

        files.forEach( file => {
            if (file != '.DS_Store' && file != 'gameinfo.JSON') {
                file = file.toLowerCase();
                gameData.push(DOMpath+'/'+date + '/' + file);
            }
        })
        gameData.sort();
        gamePics[date] = gameData;
    }
})

app.set('gamePics', gamePics);

app.listen(port, function(){
    console.log("Server is listening on port: " + port);
});
