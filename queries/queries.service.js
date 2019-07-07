// TODO: All database related stuff (setting up connection, queries etc) goes here

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
  // Get all recipes
  let recipes = [
    {
      id: 1,
      title: "Hello There!"
    },
    {
      id: 2,
      title: "General Kenobi!"
    }
  ]
  return recipes;
}

async function getRecipeById(id) {
  // Return recipe matching id
  let recipe = {
    id: 3,
    title: "Just like the simulations!"
  }
  return recipe;
}

async function createRecipe({ recipe }) {
  // Add new recipe
  let createdRecipe = {
    id: 4,
    title: "A fine addition to my collection!"
  }
  return createdRecipe;
}

async function updateRecipe(recipe) {
  // Update recipe
  let updatedRecipe = {
    id: 5,
    title: "Watch those wrist rockets!"
  }
  return updatedRecipe;
}

async function deleteRecipe(id) {
  let deletedRecipe = {
    id: 6,
    title: "It is treason then!"
  }
  return deletedRecipe;
}

module.exports = {
  authenticate,
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}