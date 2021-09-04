// import des modules npm - Ajout des plugins externes
const express = require("express"); // Importation d'express => Framework basé sur node.js

// dotenv
require("dotenv").config();

const helmet = require("helmet");

// Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande, on importe donc body-parser
const bodyParser = require("body-parser"); // Permet d'extraire l'objet JSON des requêtes POST

const app = express();
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

const path = require("path");

/*CROSS ORIGIN RESOURCE SHARING */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //l'origine qui a le droit d'accéder à notre api = tout le monde
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content, Accept, Content-Type, Authorization"
  ); //on autorise certains headers
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // on autorise ce serveur à fournir des scripts pour la page visitée
  next();
});

/* BODY PARSER */
app.use(bodyParser.json()); //.json est une méthode de l'objet bodyParser qui va transformer le corps des requêtes en objets JSON
app.use(bodyParser.urlencoded({ extended: true }));
/* HELMET */
app.use(helmet());
/*MULTER*/
app.use("/images", express.static(path.join(__dirname, "images")));

// routes
// Va servir les routes dédiées aux utilisateurs
app.use("/api/users/", usersRoutes);
app.use("/api/posts/", postsRoutes);
app.use("/api/comments/", commentsRoutes);

// Export de l'application express pour déclaration dans server.js
module.exports = app;
