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

router.get("/", isAuthenticated, function(request, response, next){
  const query = 'SELECT * FROM user_logs';
  database.query(query, function(error, log) {
      if (error) {
          console.error('Error fetching user logs:', error);
          response.status(500).send('Error fetching data');
      } else {
          response.render('userlogs', { rows: log });
      }
  });
});

router.get('/logout', function(request, response, next) {
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