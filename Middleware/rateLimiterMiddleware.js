const ms = require('ms');
const moment = require('moment')
const redis = require('redis');
const ExpressBrute = require('express-brute')
const RedisStore = require('express-brute-redis');
var fs = require('fs')
var path = require('path')

const handleStoreError = function (error) {
    console.error(error); // log this error so we can figure out what went wrong
    // cause node to exit, hopefully restarting the process fixes the problem
    throw {
        message: error.message,
        parent: error.parent
    };
};

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const logFailure = function (req, res, next, nextValidRequestDate) {
    const ip = req.ip || req.ips
    const date = new Date()
    accessLogStream.write("FAILED LOGIN ATTEMPT ON " + ip + " for email: " + req.body.email + " at " + date.toUTCString() + "\n");
    res.send({
        error: {
            text: "You've made too many failed attempts in a short period of time, please try again " + moment(nextValidRequestDate).fromNow(),
            nextValidRequestDate: nextValidRequestDate,
        }
    }).status(429)
}

const redisClient = redis.createClient();

redisClient.on('connect', function () {
    console.log("Connected to redis")
})

redisClient.on('error', function () {
    console.log("Redis crashed.")

})

const store = new RedisStore({
    client: redisClient,
});

module.exports = new ExpressBrute(store, {
    freeRetries: 3,
    minWait: ms('1s'),
    maxWait: ms('60min'),
    handleStoreError,
    failCallback: logFailure
});