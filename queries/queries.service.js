const db = require("../db");

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
  let fields = "title";
  try {
    let recipes = await db.Recipe.find({}, fields);
    return recipes
  } catch (error) {
    console.log(error);
    // Throw or return? Calling function has a cathc block
    throw err;
  }
}

async function getRecipeById(id) {
  console.log("Getting recipe by id");
  let fields = "title ingredients instructions";
  try {
    let recipe = await db.Recipe.findById(id, fields);
    console.log("Found recipe: " + recipe.title);
    return recipe
  } catch (error) {
    console.log(error);
    throw err;
  }
}

async function createRecipe(recipe) {
  console.log("Creating a recipe: " + recipe.title);
  try {
    let newRecipe = await db.Recipe.create({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    });
    console.log(recipe.title + " saved.");
    return newRecipe;
  } catch (err) {
    console.log(err);
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
    let updatedRecipe = await db.Recipe.findByIdAndUpdate(recipe.id, {
      title: recipe.update.title,
      ingredients: recipe.update.ingredients,
      instructions: recipe.update.instructions
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
    let deletedRecipe = await db.Recipe.findByIdAndRemove(id);
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