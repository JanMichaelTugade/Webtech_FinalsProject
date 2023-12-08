var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){
  const query = 'SELECT * FROM log';
  database.query(query, function(error, log) {
      if (error) {
          console.error('Error fetching history logs:', error);
          response.status(500).send('Error fetching data');
      } else {
          response.render('historylogs', { rows: log });
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