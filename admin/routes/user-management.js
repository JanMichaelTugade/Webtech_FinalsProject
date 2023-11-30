var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM user ORDER BY username DESC";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('um', {title:'User Management', action:'list', sampleData:data});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("um", {title:'Add User', action:'add'});

});



router.post("/add_user_data", function(request, response, next){

	var username = request.body.username;

	var password = request.body.password;

    var fname = request.body.fname;

    var lname = request.body.lname;

	var role = request.body.role;

	var status = 'offline';

	var query = `
        INSERT INTO user 
        (username, password, fname, lname, role, status) 
        VALUES ("${username}", "${password}", "${fname}", "${lname}", "${role}", "${status}")
    `;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/user-management");
		}

	});

});

// EDIT AND DELETE
router.get('/edit/:username', function(request, response, next){

    var username = request.params.username;

    var query = `SELECT * FROM user WHERE username = "${username}"`;

    database.query(query, function(error, data){
        if(error) {
            // handle error
            next(error);
        } else {
            var user = {
                username: data[0].username,
                password: data[0].password,
                fname: data[0].fname,
                lname: data[0].lname,
                role: data[0].role,
                status: data[0].status
            };

            response.render('um', {title: 'User Management', action: 'edit', user: user});
        }
    });

});

router.post('/edit/:username', function(request, response, next){

	var username = request.params.username;

	var newUsername = request.body.username;

	var fname = request.body.fname;

	var lname = request.body.lname;

	var role = request.body.role;

	var status = 'offline';

	var query = `
	UPDATE user
	SET username = "${newUsername}", 
	fname = "${fname}",
	lname = "${lname}",  
	role = "${role}",
	status = "${status}"
	WHERE username = "${username}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/user-management');
		}

	});

});

//DELETE

router.get('/delete/:username', function (request, response, next){
	var username = request.params.username;

	var query = `DELETE FROM user WHERE username = "${username}"`;

	database.query(query, function(error, data){
	if(error) {
		console.log("Error deleting user:", error);
	} else {
		response.redirect("/user-management");
	}
});
});

module.exports = router;

//SEARCH
router.get("/search", function(request, response, next){
    var searchTerm = request.query.term;

    var query = `
        SELECT * 
        FROM user 
        WHERE username LIKE '%${searchTerm}%' OR 
              fname LIKE '%${searchTerm}%' OR 
              lname LIKE '%${searchTerm}%'
        ORDER BY username DESC
    `;

    database.query(query, function(error, data){
        if(error) {
            // Handle error
            console.error('Error executing search query:', error);
            response.status(500).send('Error fetching data');
        } else {
            response.render('um', {title: 'User Management', action: 'list', sampleData: data});
        }
    });
});
