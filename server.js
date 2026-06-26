const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();


require('./Auth');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const logrequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.url}`);
    next();
}

 app.use(passport.initialize());
    


app.use(express.json());

const routes = require('./routes/personRoutes');

const Authenticate = passport.authenticate('local', {session: false})

app.use('/',routes);

app.get('/', Authenticate, (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
