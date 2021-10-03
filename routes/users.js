var express = require('express');
var router = express.Router();
var userRoutes = require("../Controllers/users")
/* GET users listing. */
router.use(userRoutes)

module.exports = router;
