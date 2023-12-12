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
			response.render('um', {title:'User Management', action:'list', sampleData:data, session : request.session});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render('um', {title:'Add User', action:'add', error: null});

});


router.post("/add_user_data", function(request, response, next){
    var username = request.body.username;
    var password = request.body.password;
    var fname = request.body.fname;
    var lname = request.body.lname;
    var role = request.body.role;
    // var status = 'offline';

    // Check if username or name already exists
    var checkQuery = `SELECT * FROM user WHERE username = "${username}" OR (fname = "${fname}" AND lname = "${lname}")`;

    database.query(checkQuery, function(checkError, checkData){
        if(checkError) {
            throw checkError;
        } else {
            if(checkData.length > 0) {
                // User with similar username or name already exists
                response.render('um', {
                    title: 'Add User',
                    action: 'add',
                    error: 'Username or Name already exists'
                });
            } else {
                // Insert the user into the database
                var insertQuery = `
                    INSERT INTO user 
                    (username, password, fname, lname, role) 
                    VALUES ("${username}", "${password}", "${fname}", "${lname}", "${role}")
                `;

                database.query(insertQuery, function(insertError, insertData){
                    if(insertError) {
                        throw insertError;
                    } else {
                        response.redirect('/user-management');
                    }
                });
            }
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
                // status: data[0].status
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

	// var status = 'offline';

	var query = `
	UPDATE user
	SET username = "${newUsername}", 
	fname = "${fname}",
	lname = "${lname}",  
	role = "${role}"
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

router.get('/logout', function(request, response, next) {
    request.session.destroy(function(err) {
        if (err) {
            console.error('Error destroying session:', err);
            // Handle the error, maybe redirect to an error page
            response.status(500).send('Error logging out');
        } else {
            // Redirect to the login page after logout
            response.redirect('/login');
        }
    });
});

module.exports = router;
