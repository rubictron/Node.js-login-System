var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/logincontroller', function(req, res, next) {
    res.send('login controller');
});



module.exports = router;
