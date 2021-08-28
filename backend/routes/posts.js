// Imports
const express = require("express");
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const isOwnerOrAdminPost = require("../middleware/isOwnerOrAdminPost");

const router = express.Router();

// Routes
router.post("/new", auth, multer, postsCtrl.createPost);
router.get("/", auth, multer, postsCtrl.getAllPosts);
router.get("/user/:id", auth, multer, postsCtrl.getPostProfile);
router.get("/:id", auth, multer, postsCtrl.getPostById);
router.delete("/:id", auth, multer, isOwnerOrAdminPost, postsCtrl.deletePost);
router.put("/:id/moderate", postsCtrl.moderatePost);

module.exports = router;
