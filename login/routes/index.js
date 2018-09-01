var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.post('/logincontroller', function(req, res, next) {


    // req.body.username, hashPassword(req.body.password)
    var q= "SELECT username,password FROM `nodelogin`.`users`  WHERE  username = '"
        +req.body.username+"';";

    console.log(q);
    var con = req.app.get('con');

    con.query(q, function (error, results, fields) {
        if (error) throw error;

         if(passwordHash.verify(req.body.password,results[0].password)
         )
             res.render('dashboard', { title: 'Dashboard' });
        else{
                alert('access denied');
             res.render('index', { title: 'Login' });

        }
    });


});



module.exports = router;
