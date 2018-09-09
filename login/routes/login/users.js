var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function (req, res, next) {
   var role= req.app.get('sessionChecker')(req, res);
    if(role=='admin'){
        var q ="SELECT username,role FROM users";
    }else{
        var q ="SELECT username,role FROM users WHERE username= '"+req.session.username+"';";

    }

    req.app.get('pool').getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(q, function (error, results, fields) {
            if (error) throw err;
            console.log(results);
            res.render('login/users', {
                layout: "login/layout.hbs",
                title: 'Users',
                user:results
                });
        });
        connection.release();
    });


});



module.exports = router;
