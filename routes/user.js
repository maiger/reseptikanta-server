const express = require('express');
const router = express.Router();

const authorize = require('../helpers/authorize')
const uc = require("../controllers/user");

router.post("/login", uc.authenticate);
router.get("/", authorize("user", "admin"), uc.getUsers);
router.get("/:id", authorize("user", "admin"), uc.getUserById);
router.post("/", uc.signup);
router.put("/:id", authorize("user", "admin"), uc.updateUser);
router.delete("/:id", authorize("user", "admin"), uc.deleteUser);

module.exports = router;