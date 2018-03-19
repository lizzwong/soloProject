const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const passport = require('./strategies/user.strategy');
const sessionConfig = require('./modules/session-middleware');

//mongoose setup
const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/soloproject'
let collections = []

//DB Module
const db = require('./modules/db.config.js');

// Route includes
const userRouter = require('./routes/user.router');
const inventoryRouter = require('./routes/user.inventory');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.ise('/inventory', inventoryRouter);

// Serve static files
app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
