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
router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = 'SELECT * FROM user WHERE username = "${id}"';

	database.query(query, function(error, data){

		response.render('um', {title:'User Management', action:'edit', sampleData:data[0]});
	});

});

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var username = request.body.username;

	var fname = request.body.fname;

	var lname = request.body.lname;

	var age = request.body.password;

	var role = request.body.role;

	var query = `
	UPDATE um
	SET username = "${username}", 
	lname = "${lname}", 
	age = "${age}", 
	role = "${role}" 
	WHERE id = "${id}"
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
router.get('/user-management/delete/:id', function (request, response, next){

	var id = request.params.id;

	var query ='DELETE FROM user WHERE id = "${id}"';

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("user-management")
		}
	});
});

module.exports = router;