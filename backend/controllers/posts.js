// import

const models = require("../models");
const fs = require("fs");

exports.createPost = async (req, res) => {
  try {
    // attachment
    let attachementURL = null;
    if (req.file) {
      attachementURL = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

    // user
    const findUser = await models.User.findOne({
      where: { id: req.body.userId },
    });

    if (!findUser) {
      throw new Error("Sorry,we can't find your account");
    }
    // post
    const newPost = await models.Post.create({
      title: req.body.title,
      content: req.body.content,
      attachement: attachementURL,
      UserId: req.body.userId,
      isModerate: 0,
    });

    if (!newPost) {
      throw new Error(" Sorry, missing parameters");
    }

    res.status(200).json({ newPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postFound = await models.Post.findOne({
      where: { id: req.params.id },
    });

    if (!postFound) {
      throw new Error("Sorry,can't find your post");
    }

    // attachment
    let oldAttachment = postFound.attachement;
    let attachementURL = postFound.attachement;
    if (req.file) {
      attachementURL = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

    await postFound.update({
      title: req.body.title,
      content: req.body.content,
      attachement: attachementURL,
    });

    // delete old image
    if (oldAttachment && oldAttachment != attachementURL) {
      const filename = oldAttachment.split("/images")[1];
      fs.unlink(`images/${filename}`, (error) => {
        error ? console.log(error) : console.log("file has been deleted");
      });
    }

    res.status(201).json({
      message: " Your post has been updated",
      PostUpdated: postFound,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const fields = req.query.fields;
    const order = req.query.order;

    const posts = await models.Post.findAll({
      order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
      attributes: fields != "*" && fields != null ? fields.split(",") : null,
      include: [
        {
          model: models.User,
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    if (!posts) {
      throw new Error(" Sorry , nothing to fetch");
    }
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPostProfile = async (req, res) => {
  try {
    const order = req.query.order;
    const fields = req.query.fields;

    const postProfile = await models.Post.findAll({
      order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
      attributes: fields != "*" && fields != null ? fields.split(",") : null,
      include: [
        {
          model: models.User,
          attributes: ["firstName", "lastName"],
          where: { id: req.params.id },
        },
      ],
    });
    if (!postProfile) {
      throw new Error(" This user has posted nothing ");
    }

    res.status(200).json(postProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await models.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models.User,
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    if (!post) {
      let err = " No post with this id " + req.params.id;
      console.log(err);
      throw new Error(err);
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.moderatePost = async (req, res) => {
  try {
    const postToModerate = await models.Post.findOne({
      where: { id: req.params.id },
    });

    if (!postToModerate) {
      throw new Error(" Couldn't find your post");
    }

    const moderatedPost = (await postToModerate.isModerate)
      ? postToModerate.update({
          isModerate: 0,
        })
      : postToModerate.update({
          isModerate: 1,
        });

    if (!moderatedPost) {
      throw new Error("Sorry,something gone wrong,please try again later");
    } else {
      res.status(200).json({
        message: "This post is now moderate",
        postModerate: postToModerate,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await models.Post.findOne({
      where: { id: req.params.id },
    });

    // attachment
    if (post.attachement !== null) {
      const filename = post.attachement.split("/images")[1];
      fs.unlink(`images/${filename}`, (error) => {
        error ? console.log(error) : console.log("file has been deleted");
      });
    }

    if (!post) {
      throw new Error("Sorry,your post doesn't exist ");
    }

    // post
    const destroyedPost = await models.Post.destroy({
      where: { id: req.params.id },
    });

    if (!destroyedPost) {
      throw new Error("Sorry,something gone wrong,please try again later");
    } else {
      res.status(200).json({ message: "Post has been deleted " });
    }
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
