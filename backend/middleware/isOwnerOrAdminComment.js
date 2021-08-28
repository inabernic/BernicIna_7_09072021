const models = require("../models");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const SECRET_TOKEN = process.env.SECRET_TOKEN;
  const decodedToken = jwt.verify(token, SECRET_TOKEN);
  const userId = decodedToken.id;
  const userIsAdmin = decodedToken.isAdmin;

  models.Comment.findOne({ where: { id: req.params.id } }).then((c) => {
    if (userId == c.userId || userIsAdmin == 1) {
      next();
    } else {
      res.status(403).json({
        error:
          "Invalid request! Le commaintaire apartient à un autre utilisateur",
      });
    }
  });
};
