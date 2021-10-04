var express = require("express");
var router = express.Router();
var friendship = require("../Controllers/friendship");
router.use("/friends", friendship);

module.exports = router;
