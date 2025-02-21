const express = require('express');
const app = express(); // Properly declare 'app'
const router = express.Router();
const path = require('path');
const routhPath = require('./utils/path');

// Logger middleware
router.get('/user/add',(req, res, next) => {
    res.sendFile(path.join(routhPath,'views', 'adduser.html'));
        // res.end();
});

router.get('/public/css/main.css', (req, res, next) => { 
    res.sendFile(path.join(__dirname,'public','css','main.css'));
});

// Route to get the username
router.get('/username', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200);
    res.send('Hello, Username!');
});

// Route to add a user
router.post('/user/add', (req, res) => {
    let body = req.body;
    res.status(200).send(body); // Send response without logging it to screen
});



// Logger middleware
const logger = function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

exports.router = router; // Export 'app' for testing
exports.logger = logger; // Export 'app' for testing