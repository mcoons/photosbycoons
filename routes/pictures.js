var express = require('express');
var router = express.Router();

router.get('/:genre', function (req,res){

    var genres = req.app.get('genres');
    var pics = req.app.get('allPics')[req.params.genre];
    // console.log("pics in route", pics);
    var size = 5;
    var page = 1;
    var previous = false;
    var next = false;
    var totalPages = Math.ceil(pics.length/size);

    var startIndex = 0;
    var endIndex = size < pics.length-1 ? size-1 : pics.length-1;
    
    if (typeof req.query.page != 'undefined' && (Number(req.query.page)-1)*size < pics.length) {
        page = Number(req.query.page);
        startIndex = (page-1)*size;
        endIndex = (page-1)*size+size-1 < pics.length-1 ? (page-1)*size+size-1 : pics.length;
    }
    
    if (startIndex > 0) previous = true;
    if (endIndex < pics.length) next = true;

    // console.log("pics before slice", pics);

    pics = pics.slice(startIndex, endIndex+1); 

    // console.log("pics after slice", pics);

    res.render('pictures', {
        logo: '/me.jpeg',
        jumboPic: '/jumbotron.jpg',
        page: page,
        totalPages: totalPages,
        genres: genres,
        previous: previous,
        next: next,
        pics : pics,
        genre: req.params.genre,
        pageTitle: req.params.genre,
        pageID: req.params.genre
    });
});

module.exports = router;