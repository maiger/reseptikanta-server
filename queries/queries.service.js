const Recipe = require("../db/models/recipe.js").Recipe
const User = require("../db/models/user.js").User
// Add jwt
const bcrypt = require("bcryptjs")

async function signup(newUser) {
  // validate
  if (await User.findOne({ username: newUser.username })) {
    throw 'Username "' + newUser.username + '" is already taken';
  }

  const user = new User(newUser);

  // hash password
  if (newUser.password) {
    user.hash = bcrypt.hashSync(newUser.password, 10);
  }

  // save user
  let createdUser = await user.save();
  return createdUser;
}

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      ...userWithoutHash,
      token
    };
  }
};

async function getUsers() {
  console.log("Getting all users")
  let fields = "username role createdDate";
  try {
    let users = await User.find({}, fields);
    return users
  } catch (err) {
    // Throw or return? Calling function has a cathc block
    throw err;
  }
}

async function getUserById(id) {
  console.log("Getting user by id");
  let fields = "username role createdDate";
  try {
    let user = await User.findById(id, fields);
    if (user) {
      console.log("Found user: " + user.username);
    }
    return user
  } catch (err) {
    throw err;
  }
}

async function updateUser(id, updatedUser) {
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found';
  if (user.username !== updatedUser.username && await User.findOne({ username: updatedUser.username })) {
    throw 'Username "' + updatedUser.username + '" is already taken';
  }

  // hash password if it was entered
  if (updatedUser.password) {
    updatedUser.hash = bcrypt.hashSync(updatedUser.password, 10);
  }

  // copy updatedUser properties to user
  Object.assign(user, updatedUser);

  let user = await user.save();
  return user;
}

async function deleteUser(id) {
  try {
    let deletedUser = await User.findByIdAndRemove(id);
    return deletedUser
  } catch(err) {
    throw err;
  }
}

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
    if (recipe) {
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
    if (newRecipe) {
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
      difficulty: recipe.update.difficulty,
      preptime: recipe.update.preptime,
      servings: recipe.update.servings,
      tags: recipe.update.tags
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
  signup,
  authenticate,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}