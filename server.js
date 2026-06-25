const express = require('express');
const app = express(); 
const db = require('./db');
const Person = require('./models/person');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const logrequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.url}`);
    next();
}

app.use(new LocalStrategy(async (USERNAME, PASSWORD, done) => {
       try{

            console.log('Received credentials:',USERNAME,PASSWORD);
            const user = await Person.findOne({ username: USERNAME });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password !== PASSWORD) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
       }
       catch(err){
        return done(err);
       }
    }));

    app.use(passport.initialize());
    



app.use(logrequest);
app.use(express.json());
const routes = require('./routes/personRoutes');
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
