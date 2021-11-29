const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  friendsList: [
    {
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      friendName: {
        type: String,
        default: "",
      },
    },
  ],
  lastUpdate: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.index({ firstName: "text", lastName: "text", email: "text" });
var model = mongoose.model("Users", userSchema);
model.createIndexes();
module.exports = model;
