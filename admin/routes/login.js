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
                var userRole = data[0].role;

                request.session.user = {
                    username: username,
                    role: userRole
                };

                // Check the user's role
                if (userRole === 'Admin') {
                    // Redirect to the admin page for users with the 'admin' role
                    response.redirect("/user-management");
                } else if (userRole === 'Manager') {
                    // Show an alert indicating access is for admins only
                    response.send('<script>alert("Admins only"); window.location.href = "/login";</script>');
                }
            } else {
                // User not found or incorrect password, handle accordingly
                response.render("login", { title: 'Login', error: 'Invalid username or password' });
            }
        }
    });
});

module.exports = router;
