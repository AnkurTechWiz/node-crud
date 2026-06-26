const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');

const MongoURL = process.env.MONGO_URL;
mongoose.connect(MongoURL)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const db = mongoose.connection;




module.exports = db;
