var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/controller', function(req, res, next) {

    var hashedPassword = passwordHash.generate(req.body.password);

     // req.body.username, hashPassword(req.body.password)
    var q= "INSERT INTO `nodelogin`.`users` (`email`, `username`, `password`) VALUES ('"
                +req.body.emailad+"','"
                +req.body.username+"','"
                +hashedPassword+"');";

    console.log(q);
    var con = req.app.get('con');

    con.query(q, function (error, results, fields) {
        if (error) throw error;
        res.send('respond with a registor controll');
    });


});

router.post('/controller/confirm', function(req, res, next) {
    var q= "UPDATE `nodelogin`.`users` SET `role`='level0' WHERE  `email`='p.as';";
    res.send('respond with a registor controll');
});


module.exports = router;
