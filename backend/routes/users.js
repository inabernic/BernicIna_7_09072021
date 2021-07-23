const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.get("/", usersCtrl.getUsers);
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.delete("/delete", auth, usersCtrl.deleteProfile);
router.get("/myprofile", auth, usersCtrl.userProfile);

router.put("/update", auth, usersCtrl.updateProfile);

module.exports = router;
