const express = require('express');
const router = express.Router();

const authorize = require('../helpers/authorize')
const rc = require("../controllers/recipe")

router.get("/", rc.getRecipes) // Everyone can read recipes
router.get("/:id", rc.getRecipeById)
router.post("/", authorize(["user", "admin"]), rc.createRecipe)
router.put("/:id", authorize(["user", "admin"]), rc.updateRecipe)
router.delete("/:id", authorize(["user", "admin"]), rc.deleteRecipe)

module.exports = router;