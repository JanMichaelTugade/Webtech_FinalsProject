const express = require('express');
const app = express();
const port = 3000;

// Assuming you have a dbcon.js file that exports the connection
const dbcon = require('./dbcon');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM logs';
    const [rows] = await dbcon.query(query);
    
    res.render('index', { rows });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
