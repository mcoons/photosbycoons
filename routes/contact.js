var express = require('express');
var router = express.Router();

router.get('/contact', function(req, res){

    var genres = req.app.get('genres');

    res.render('contact', {
        logo: '/me.jpeg',
        jumboPic: '/jumbotron.jpg',
        genres: genres,
        pageTitle: 'Contact',
        pageID: 'contact'
    });
});

module.exports = router;