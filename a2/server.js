const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

// server.js
const fs = require('fs');
const PORT = 3000;

app.get('/phrases', (req, res) => {
    fs.readFile('C:/targetPhrases.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading phrases file');
            return;
        }
        const phrases = data.split('\n').filter(Boolean); // Split by line and remove empty lines
        res.json(phrases);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});