const User = require("../db/models/user.js").User

// Secret string for JWT, remember to add this file as it is in .gitignore
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")

async function signup(newUser) {
  // validate
  if (await User.findOne({ username: newUser.username })) {
    throw { name: "InvalidUsername", message: 'Username "' + newUser.username + '" is already taken' };
  }

  const user = new User(newUser);

  // hash password
  if (newUser.password) {
    user.hash = bcrypt.hashSync(newUser.password, 10);
  } else {
    throw { name: "InvalidPassword", message: 'Password required' };
  }

  // save user
  let createdUser = await user.save();
  return createdUser;
}

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    // Token expiration in seconds (12h)
    let expiresIn = 43200;
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, { expiresIn: expiresIn });
    return {
      ...userWithoutHash,
      token,
      expiresIn
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

  let u = await user.save();
  return u;
}

async function deleteUser(id) {
  try {
    let deletedUser = await User.findByIdAndRemove(id);
    return deletedUser
  } catch (err) {
    throw err;
  }
}

module.exports = {
  signup,
  authenticate,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
}