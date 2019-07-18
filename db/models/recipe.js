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
    },
    difficulty: {
      type: Number,
      required: false
    },
    preptime: {
      type: Number,
      required: false
    },
    servings: {
      type: Number,
      required: false
    },
    tags: {
      type: [String],
      required: false
    }
  }
)

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = { Recipe };