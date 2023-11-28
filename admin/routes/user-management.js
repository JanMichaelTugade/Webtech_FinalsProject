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

module.exports = router;