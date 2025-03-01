const express = require('express');
const app = express(); // Properly declare 'app'
const router = require('./adduser.js');
const homeRoute = require('./home.js');
const bodyParser = require('body-parser');
const path = require('path');
const { productRouter } = require('./product.js');
const { cartRouter } = require('./cart.js');
const {fetchData,sequelizeConn} = require('./database.js');
const Data = require('./models/product.js');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Use the logger middleware
app.use(router.logger);
app.use(router.router);
app.use(homeRoute.homeRoutes);

app.use(productRouter);
app.use(cartRouter);

const data = fetchData().then((result) => {
});

sequelizeConn.authenticate()
    .then(() => {
        console.log('Connected to sequalize!');
    })
    .catch(err => {
        console.error('Error connecting to MariaDB:', err);
    });

    Data.sync().then(() => {
        console.log('Database synced');
    }).catch(err => {
        console.error('Error syncing database:', err);
    });

    Data.create({
        title: 'A Book',
        name: 'Book',
        price: 12.99,
        imageUrl: 'https://www.google.com',
        description: 'A book about something'
    }).then(result => {
        console.log('Created a product');
    }).catch(err => {
        console.error('Error creating product:', err);
    });
//bootstrap routing
app.use('/css', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.min.css'));
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
    // res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
