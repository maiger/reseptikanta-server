const express = require('express');
const router = express.Router();

const rc = require("../controllers/recipe")

router.get("/", rc.getRecipes) // All authenticated users
router.get("/:id", rc.getRecipeById)
router.post("/", rc.createRecipe) // Admin only
router.put("/:id", rc.updateRecipe)
router.delete("/:id", rc.deleteRecipe)

module.exports = router;