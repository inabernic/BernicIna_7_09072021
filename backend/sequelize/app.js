const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");

const sequelize = new Sequelize("groupomania", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

const app = express();
app.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
app.listen(3000);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established succesfully.");
    await User.sync({ force: true });
    await User.create({ firstName: "Ina", lastName: "De" });
  } catch (error) {
    console.log("Unable to connect to the database.", error);
  }
}
test();
