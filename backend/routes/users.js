const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
///    /api/users/
router.get("/", usersCtrl.getUsers);
// Route qui permet de cliquer sur une des sauces précise
// Renvoie la sauce avec l'ID fourni
router.get("/:id", usersCtrl.getOneUser);
///    /api/users/signup
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
//TODO: add isOwnerOrAdmin middleware
router.delete("/:id", usersCtrl.deleteUser);
router.put("/:id", auth, usersCtrl.updateUser);

module.exports = router;
