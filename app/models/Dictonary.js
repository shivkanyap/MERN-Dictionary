const mongoose = require("mongoose");

const dictinorySchema = new mongoose.Schema({
  word: {
    type: String,
    // required: true,
  },
  definition: {
    type: String,
  },
  examples: {
    type: [Object],
  },
  shortDefinitions: {
    type: [Object],
  },
  pronunciations: {
    type: [Object],
  },
});

module.exports = mongoose.model("Dictinory", dictinorySchema);
