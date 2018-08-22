var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.get('/registercontroller', function(req, res, next) {
    res.send('respond with a registor controll');
});


module.exports = router;
