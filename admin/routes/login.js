var express = require('express');
var router = express.Router();
var database = require('../database');

// Login route
router.get("/", function(request, response, next){
    response.render("login", { title: 'Login' , session : request.session}); 
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

              
                if (userRole === 'Admin') {
                    
                    response.redirect("/user-management");
                } else if (userRole === 'Manager') {
                  
                    response.send('<script>alert("Admins only"); window.location.href = "/login";</script>');
                }
            } else {
                
                response.render("login", { title: 'Login', error: 'Invalid username or password' });
            }
        }
    });
});

module.exports = router;
