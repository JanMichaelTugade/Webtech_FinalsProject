var express = require('express');

var router = express.Router();

var database = require('../database');

function isAuthenticated(request, response, next) {
    if(request.session && request.session.user){
        return next();
    } else {
        response.redirect('/login');
    }
}

let AFKTimer;
const AFKTime = 5 * 60 * 1000;

function resetAFKTimer() {
    clearTimeout(AFKTimer);
    AFKTimer = setTimeout(setUserAFK, AFKTime);
}

function setUserAFK() {
   
    console.log("User is AFK");
   
}


router.use(function (req, res, next) {
    resetAFKTimer(); 
    next();
});

router.get("/", isAuthenticated, function(request, response, next){

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

router.get("/add", isAuthenticated, function(request, response, next){

	response.render('um', {title:'Add User', action:'add', error: null});

});


router.post("/add_user_data", isAuthenticated, function(request, response, next){
    var username = request.body.username;
    var password = request.body.password;
    var fname = request.body.fname;
    var lname = request.body.lname;
    var role = request.body.role;
   

   
    var checkQuery = `SELECT * FROM user WHERE username = "${username}" OR (fname = "${fname}" AND lname = "${lname}")`;

    database.query(checkQuery, function(checkError, checkData){
        if(checkError) {
            throw checkError;
        } else {
            if(checkData.length > 0) {
               
                response.render('um', {
                    title: 'Add User',
                    action: 'add',
                    error: 'Username or Name already exists'
                });
            } else {
               
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
router.get('/edit/:username', isAuthenticated, function(request, response, next){

    var username = request.params.username;

    var query = `SELECT * FROM user WHERE username = "${username}"`;

    database.query(query, function(error, data){
        if(error) {
            
            next(error);
        } else {
            var user = {
                username: data[0].username,
                password: data[0].password,
                fname: data[0].fname,
                lname: data[0].lname,
                role: data[0].role,
                
            };

            response.render('um', {title: 'User Management', action: 'edit', user: user});
        }
    });

});

router.post('/edit/:username', isAuthenticated, function(request, response, next){

	var username = request.params.username;

	var newUsername = request.body.username;

	var fname = request.body.fname;

	var lname = request.body.lname;

	var role = request.body.role;



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

router.get('/delete/:username', isAuthenticated, function (request, response, next){
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
router.get("/search", isAuthenticated, function(request, response, next){
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
          
            console.error('Error executing search query:', error);
            response.status(500).send('Error fetching data');
        } else {
            response.render('um', {title: 'User Management', action: 'list', sampleData: data});
        }
    });
});

router.get('/logout', function(request, response, next) {
    clearTimeout(AFKTimer);
    request.session.destroy(function(err) {
        if (err) {
            console.error('Error destroying session:', err);
           
            response.status(500).send('Error logging out');
        } else {
           
            response.redirect('/login');
        }
    });
});

module.exports = router;
