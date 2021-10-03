var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose')
const passport = require('passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('dotenv').config({ path: __dirname + '/config/.env' })



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(limiter);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./Middleware/passport")(passport);

app.use('/api', usersRouter);

mongoose
    .connect(
        process.env.DB_HOST,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.listen(3000, () => {
    console.log("Server running")
})
module.exports = app;
