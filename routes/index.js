var express = require('express');
var router = express.Router();

router.get('/', function (req, res){

    var genres = req.app.get('genres');

    res.render('index', {
        logo: '/me.jpeg',
        jumboPic: '/jumbotron.jpg',
        genres: genres,
        pageTitle: 'Home',
        pageID: 'home'
    });
});

module.exports = router;