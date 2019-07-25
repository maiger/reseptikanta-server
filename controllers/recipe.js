const queryService = require("../services/recipe")

function getRecipes(req, res, next) {
  queryService.getRecipes()
    .then(queries => {
      res.json(queries)
    })
    .catch(err => next(err));
}

function getRecipeById(req, res, next) {
  queryService.getRecipeById(req.params.id)
    .then(queries => res.json(queries))
    .catch(err => next(err));
}

function createRecipe(req, res, next) {
  queryService.createRecipe(req.body)
    .then(queries => res.json(queries))
    .catch(err => next(err));
}

function updateRecipe(req, res, next) {
  queryService.updateRecipe({ id: req.params.id, update: req.body })
    .then(queries => res.json(queries))
    .catch(err => next(err));
}

function deleteRecipe(req, res, next) {
  queryService.deleteRecipe(req.params.id)
    .then(queries => res.json(queries))
    .catch(err => next(err));
}

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
}