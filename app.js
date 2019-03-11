const express = require('express');
const app = express();
const fs = require('fs');
// const EXIF = require('exif-js');
const exifParser = require('exif-parser');
const Fraction = require('fractional').Fraction;



const localPort = 3002;
const port = process.env.PORT || localPort;

const picsFolder = 'public/images';
const DOMpath = 'images';

var genreFolders = [];
var allPics = {};

app.locals.siteTitle = 'Pictures by Coons';

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/pictures'));

genreFolders = fs.readdirSync(picsFolder);
if (genreFolders[0] = ".DS_Store") genreFolders.shift();

app.set('genres', genreFolders);

genreFolders.forEach( genreFolder => {
    if (genreFolder != '.DS_Store') {
        let picData = [];
        let files = fs.readdirSync(picsFolder+'/'+genreFolder);

        files.forEach( file => {
            if (file != '.DS_Store') {
                // file = file.toLowerCase();
                let buffer = fs.readFileSync(picsFolder+'/'+genreFolder + '/' +file);
                let parser = exifParser.create(buffer);
                parser.enableSimpleValues([false]);

                let result = parser.parse();
                picData.push({  file: file, 
                                path: DOMpath+'/'+genreFolder + '/' + file,
                                exif: result,
                                desc: result.tags.ImageDescription,
                                camera: result.tags.Model,
                                focalLength: result.tags.FocalLength,
                                shutterSpeed: new Fraction(result.tags.ExposureTime),
                                aperture: result.tags.ApertureValue,
                                iso: result.tags.ISO,
                                exposureBias: new Fraction(Number(result.tags.ExposureCompensation).toFixed(2))
                            });
            }
        })
        picData.sort();
        allPics[genreFolder] = picData;
    }
})

// console.log("allPics", allPics);

app.set('allPics', allPics);

app.listen(port, function(){
    console.log("Server is listening on port: " + port);
});
