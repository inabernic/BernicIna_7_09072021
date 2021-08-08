// Middleware qui protégera les routes sélectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes.

// On récupère le package jsonwebtoken
const jwt = require("jsonwebtoken");

// On vérifie le TOKEN de l'utilisateur, s'il correspond à l'id de l'utilisateur dans la requête, il sera autorisé à changer les données correspondantes.
const SECRET_TOKEN = "RANDOM_TOKEN_SECRET";
// Ce middleware sera appliqué à toutes les routes afin de les sécuriser
module.exports = (req, res, next) => {
  try {
    console.log("Auth start", SECRET_TOKEN);
    // On récupère le token dans le header de la requête autorisation, on récupère uniquement le deuxième élément du tableau (car split)
    const token = req.headers.authorization.split(" ")[1];
    // On vérifie le token décodé avec la clé secrète initiéé avec la création du token encodé initialement (Cf Controller user), les clés doivent correspondre
    console.log("token: ", token);
    const decodedToken = jwt.verify(
      token,
      SECRET_TOKEN,
      (err, decodedToken) => {
        console.log("verify back: ", err, decodedToken);
        if (err) {
          console.log(err);
          return res.status(403).json(err);
        }
        // On vérifie que le userId envoyé avec la requête correspond au userId encodé dans le token
        console.log("decoded token: ", decodedToken);
        const userId = decodedToken.id;
        console.log("userId: ", userId);
        if (req.body.userId && req.body.userId !== userId) {
          res.status(401).json({
            error: "Invalid user ID!",
          });
        } else {
          next();
        }
      }
    );
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
