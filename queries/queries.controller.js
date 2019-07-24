const express = require('express');
const router = express.Router();
const queryService = require("./queries.service")

const baseAPIUrl = "/api/recipes"

router.post("/api/login", authenticate); // Public route
router.post("/api/signup", signup);

router.put("api/user"  + "/:id", updateUser);
router.delete("api/user" + "/:id", deleteUser);

router.get(baseAPIUrl, getRecipes) // All authenticated users
router.get(baseAPIUrl + "/:id", getRecipeById)
router.post(baseAPIUrl, createRecipe) // Admin only
router.put(baseAPIUrl + "/:id", updateRecipe)
router.delete(baseAPIUrl + "/:id", deleteRecipe)

module.exports = router;

function authenticate(req, res, next) {
  queryService.authenticate(req.body)
    .then(user => {
      if(user) {
        console.log("Loggin in user: " + user.name);
        res.json(user);
      } else {
        console.log("Username or password is incorrect")
        res.status(400).json({message: "Username or password is incorrect"})
      }
    })
    .catch(err => next(err));
}

function signup(req, res, next) {
  queryService.signup(req.body)
  .then(queries => {
    res.json(queries)})
  .catch(err => next(err));
}

function updateUser(req, res, next) {
  queryService.updateUser(req.params.id, req.body)
    .then(queries => res.json(queries))
    .catch(err => next(err));
}

function deleteUser(req, res, next) {
  queryService.deleteUser(req.params.id)
    .then(queries => res.json(queries))
    .catch(err => next(err));
}

function getRecipes(req, res, next) {
  queryService.getRecipes()
    .then(queries => {
      res.json(queries)})
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
  queryService.updateRecipe({id: req.params.id, update: req.body})
    .then(queries => res.json(queries))
    .catch(err => next(err));
}

function deleteRecipe(req, res, next) {
  queryService.deleteRecipe(req.params.id)
    .then(queries => res.json(queries))
    .catch(err => next(err));
}