// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up the static directory for the web server
app.use(express.static('public'));

// Set up the comments file
const commentsPath = path.join(__dirname, 'comments.json');
let comments = [];
if (fs.existsSync(commentsPath)) {
  comments = JSON.parse(fs.readFileSync(commentsPath));
}

// Set up the comments route
app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFileSync(commentsPath, JSON.stringify(comments));
  res.json(comment);
});

// Start the web server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});