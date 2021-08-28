const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const commentCtrl = require("../controllers/comments");
const isOwnerOrAdminComment = require("../middleware/isOwnerOrAdminComment");

const router = express.Router();

// Routes
router.get("/post/:id", auth, commentCtrl.getCommentsByPostId);
router.get("/user/:id", auth, multer, commentCtrl.getCommentsByUserId);
router.post("/new", auth, multer, commentCtrl.createComment);
router.delete(
  "/:id",
  auth,
  multer,
  isOwnerOrAdminComment,
  commentCtrl.deleteComment
);

module.exports = router;
