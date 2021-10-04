const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// Load User model
const User = require("../models/users");

router.get("/search", async function (req, res) {
  console.log(req.query);
  await User.ensureIndexes();
  User.find({
    $text: { $search: req.query.searchQuery },
  }).exec(function (err, result) {
    if (err) throw err;
    console.log(result);

    res.send(result).status(200);
  });
});

module.exports = router;
