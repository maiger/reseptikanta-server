const express = require('express');
const router = express.Router();

const uc = require("../controllers/user")

router.post("/login", uc.authenticate); // Public route
router.get("/", uc.getUsers)
router.get("/:id", uc.getUserById)
router.post("/", uc.signup);
router.put("/:id", uc.updateUser);
router.delete("/:id", uc.deleteUser);

module.exports = router;