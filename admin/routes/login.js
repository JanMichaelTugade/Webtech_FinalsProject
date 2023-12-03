var express = require('express');
var router = express.Router();
var database = require('../database');

// Login route
router.get("/", function(request, response, next){
    response.render("login", { title: 'Login' , session : request.session}); // Render your login page
});

router.post("/", function(request, response, next){
    var username = request.body.username;
    var password = request.body.password;

    var query = `SELECT * FROM user WHERE username = "${username}" AND password = "${password}"`;

    database.query(query, function(error, data){
        if(error) {
            throw error;
        } else {
            if(data.length > 0) {
                // User exists, redirect to user management or dashboard
                response.redirect("/user-management");
            } else {
                // User not found or incorrect password, handle accordingly
                response.render("login", { title: 'Login', error: 'Invalid username or password' });
            }
        }
    });
});

module.exports = router;
