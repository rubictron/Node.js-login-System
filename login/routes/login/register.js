var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('login/register', {layout: "login/layout.hbs", title: 'Register'});
});

router.post('/controller', function (req, res, next) {

    var hashedPassword = passwordHash.generate(req.body.password);
    var r = Math.random().toString(36).substring(2, 7);
    var hashedr = passwordHash.generate(r);

    var q = "INSERT INTO `nodelogin`.`users` (`email`, `username`, `password`) VALUES ('"
        + req.body.emailad + "','"
        + req.body.username + "','"
        + hashedPassword + "');";
    var q2 = "INSERT INTO `nodelogin`.`confirm` (`user`, `code`) VALUES ('"
        + req.body.username + "', '"
        + hashedr + "');";

    var mailOptions = {
        from: 'rubictron.00@gmail.com',
        to: req.body.emailad,
        subject: 'Node Js Confirm Code by Rubictron',
        text: 'Your Confirmation Code is (' + r + ')'
    };

    console.log(r);
    req.app.get('pool').getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(q, function (error, results, fields) {
            if (error) connection.rollback();
        });
        connection.query(q2, function (error, results, fields) {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.render('login/confirm', {layout: "login/layout.hbs", title: "Confirm"});
            connection.release();
            if (error) throw error;
        });
    });

});

router.post('/confirm', function (req, res, next) {

    var q2 = "UPDATE `nodelogin`.`users` SET `role`='level0' WHERE  `username`='"+req.body.username+"';";
    var q = "SELECT `user`, `code` FROM `nodelogin`.`confirm` WHERE  `user`='"+req.body.username+"' ;";
        req.app.get('pool').getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(q, function (error, results, fields) {
                if (passwordHash.verify(req.body.confirmcode, results[0].code)) {
                    connection.query(q2, function (error, results, fields) {
                        res.redirect('/dashboard');
                        if (error) throw error;
                    });
                    connection.release();

                }
                if (error) throw error;
            });

        });
});


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});


module.exports = router;
