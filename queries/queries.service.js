const Recipe = require("../db/models/recipe.js").Recipe

async function authenticate({ email, password }) {
  // Find user by email
  // Check if correct password
  // Create JWT
  // Return user and token
  let user = {
    id: 1,
    name: "Darth Plagueis the Wise",
    role: "admin"
  }
  let token = "I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. It's ironic he could save others from death, but not himself."

  return { ...user, token }
};

async function getRecipes() {
  console.log("Getting all recipes")
  let fields = "title tags preptime difficulty servings";
  try {
    let recipes = await Recipe.find({}, fields);
    return recipes
  } catch (err) {
    // Throw or return? Calling function has a cathc block
    throw err;
  }
}

async function getRecipeById(id) {
  console.log("Getting recipe by id");
  let fields = "title ingredients instructions difficulty preptime servings tags";
  try {
    let recipe = await Recipe.findById(id, fields);
    if(recipe) {
      console.log("Found recipe: " + recipe.title);
    }
    return recipe
  } catch (err) {
    throw err;
  }
}

async function createRecipe(recipe) {
  console.log("Creating a recipe: " + recipe.title);
  try {
    let newRecipe = await Recipe.create({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      difficulty: recipe.difficulty,
      preptime: recipe.preptime,
      servings: recipe.servings,
      tags: recipe.tags
    });
    if(newRecipe) {
      console.log(newRecipe.title + " saved.");
    }
    return newRecipe;
  } catch (err) {
    throw err
  }
}

async function updateRecipe(recipe) {
  console.log("Updating recipe: " + recipe.update.title);
  // Return the updated recipe
  let options = {
    new: true
  }
  try {
    let updatedRecipe = await Recipe.findByIdAndUpdate(recipe.id, {
      title: recipe.update.title,
      ingredients: recipe.update.ingredients,
      instructions: recipe.update.instructions,
      difficulty: recipe.difficulty,
      preptime: recipe.preptime,
      servings: recipe.servings,
      tags: recipe.tags
    }, options);
    //TODO:  If recipe not found, returns null, not an error, do something about this. Check etc.
    console.log(recipe.update.title + " updated.");
    return updatedRecipe;
  } catch (err) {
    console.log(err);
    throw err
  }
}

async function deleteRecipe(id) {
  console.log("Deleting recipe: " + id);
  try {
    let deletedRecipe = await Recipe.findByIdAndRemove(id);
    console.log(deletedRecipe.title + " deleted.");
    return deletedRecipe;
  } catch (err) {
    console.log(err);
    throw err
  }
}

module.exports = {
  authenticate,
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}