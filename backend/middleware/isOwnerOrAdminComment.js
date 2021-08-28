const models = require("../models");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  //const SECRET_TOKEN = process.env.SECRET_TOKEN;
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.id;

  models.Comment.findOne({ where: { id: req.params.id } }).then((c) => {
    console.log(userId, c.userId);
    if (userId == c.userId) {
      next();
    } else {
      res.status(403).json({
        error:
          "Invalid request! Le commaintaire apartient à un autre utilisateur",
      });
    }
  });
};
