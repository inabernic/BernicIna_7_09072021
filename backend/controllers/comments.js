const models = require("../models");
const fs = require("fs");

exports.createComment = async (req, res) => {
  try {
    const newCom = await models.Comment.create({
      comment: req.body.comments,
      UserId: req.body.userId,
      PostId: req.body.postId,
    });

    if (newCom) {
      res.status(201).json({ message: "Your comment has been sent", newCom });
    } else {
      throw new Error("Sorry , something gone wrong");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const commentFound = await models.Comment.findOne({
      where: { id: req.params.id },
    });

    if (!commentFound) {
      throw new Error("Sorry,can't find your comment");
    }

    console.log(req.body);
    await commentFound.update({
      comment: req.body.comment,
    });

    res.status(201).json({
      message: " Your comment has been updated",
      CommentUpdated: commentFound,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await models.Comment.findAll({
      order: [["createdAt", "DESC"]],
      where: { postId: req.params.id },
      include: [{ model: models.User, attributes: ["firstName", "lastName"] }],
    });
    if (comments) {
      res.status(200).send(comments);
    } else {
      throw new Error("There are no comments");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentsByUserId = async (req, res) => {
  try {
    const comments = await models.Comment.findAll({
      order: [["createdAt", "DESC"]],
      where: { userId: req.params.id },
      include: [{ model: models.User, attributes: ["firstName", "lastName"] }],
    });
    if (comments) {
      res.status(200).send({ message: comments });
    } else {
      res.status(200).send({ message: [] });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await models.Comment.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Comment has been deleted " });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// UPDATE PROJECT FOR FUTURE
exports.answerComment = async (req, es) => {};
