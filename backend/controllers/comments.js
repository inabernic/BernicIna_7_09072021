// import

const models = require("../models");
const fs = require("fs");

exports.createComment = async (req, res) => {
  try {
    let comments = req.body.comments;
    const newCom = await models.Comment.create({
      comments: comments,
      UserId: req.user.id,
      PostId: req.params.id,
    });

    if (newCom) {
      res.status(201).json({ message: "Your comment has been sent", newCom });
    } else {
      throw new Error("Sorry , something gone wrong");
    }
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
