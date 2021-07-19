
const Dictinory = require("../models/Dictonary");
const express = require("express");
const router = express.Router();
const axios = require("axios");

const keys = require("../../config/keys");

router.post("/add", async (req, res) => {
  try {
    const result = await axios.get(
      `https://od-api.oxforddictionaries.com/api/v2/entries/en/${req.body.title}`,
      {
        headers: {
          app_id: "b9ccd843",
          app_key: "66507d3c45b99256a09db77d20b9fba7",
        },
      }
    );
    console.log(result, "in resu");

    if (result) {
      // extract req data from result & save it into the model

      let examples = null;
      let shortDefinitions = null;
      let pronunciations = null;

      result.data.results[0].lexicalEntries[0].entries[0].senses[0].examples
        ? (examples =
            result.data.results[0].lexicalEntries[0].entries[0].senses[0]
              .examples)
        : null;
      result.data.results[0].lexicalEntries[0].entries[0].pronunciations
        ? (pronunciations =
            result.data.results[0].lexicalEntries[0].entries[0].pronunciations)
        : null;
      result.data.results[0].lexicalEntries[0].entries[0].senses[0]
        .shortDefinitions
        ? (shortDefinitions =
            result.data.results[0].lexicalEntries[0].entries[0].senses[0]
              .shortDefinitions)
        : null;
      let dataVal = {
        word: result.data.word,
        definition:
          result.data.results[0].lexicalEntries[0].entries[0].senses[0]
            .definitions[0],
        examples: examples,
        pronunciations: pronunciations,
        shortDefinitions: shortDefinitions,
      };

      const newData = new Dictinory(dataVal);

      const dataResult = await newData.save();

      return res
        .status(201)
        .json({ error: "", data: dataResult, message: "Data added " });
    } else {
      // res.send error saying issue wrt oford api call
      return res
        .status(500)
        .json({ error: "", message: "error in reterving the data" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const list = await Dictinory.find();
    return res.status(200).json(list);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const list = await Dictinory.find({
      word: { $regex: `^${req.query.word}.*`, $options: "i" },
    });

    return res.status(200).json(list);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
});

module.exports = {
  dicRouter: router,
};
