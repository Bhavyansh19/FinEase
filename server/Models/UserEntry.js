const mongoose = require("mongoose");

const UserEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  explain: { type: String },
  amount: { type: Number, required: true },
  how: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const UserEntry = mongoose.model("UserEntry", UserEntrySchema);
module.exports = UserEntry;
