const queryService = require("../services/user")

function signup(req, res, next) {
  queryService.signup(req.body)
    .then(user => {
      res.json(user)
    })
    .catch(err => next(err));
}

function authenticate(req, res, next) {
  queryService.authenticate(req.body)
    .then(user => {
      if (user) {
        console.log("Loggin in user: " + user.username);
        res.json(user);
      } else {
        console.log("Username or password is incorrect")
        res.status(400).json({ message: "Username or password is incorrect" })
      }
    })
    .catch(err => next(err));
}

function getUsers(req, res, next) {
  queryService.getUsers()
    .then(users => {
      res.json(users)
    })
    .catch(err => next(err));
}

function getUserById(req, res, next) {
  queryService.getUserById(req.params.id)
    .then(user => res.json(user))
    .catch(err => next(err));
}

function updateUser(req, res, next) {
  queryService.updateUser(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
}

function deleteUser(req, res, next) {
  queryService.deleteUser(req.params.id)
    .then(queries => res.json(queries))
    .catch(err => next(err));
}

module.exports = {
  signup,
  authenticate,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
}