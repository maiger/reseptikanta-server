const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    ingredients: {
      type: String,
      required: false
    },
    instructions: {
      type: String,
      required: false
    }
  }
)

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = { Recipe };