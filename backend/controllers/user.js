const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();

    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      throw new Error("Sorry,can't find your account");
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signup = async (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  try {
    //verif params
    validationInput(email, firstName, lastName, password);

    // On cherche l'utilisateur dans la bdd
    const oldUser = await models.User.findOne({
      attributes: ["email"],
      where: { email: email },
    });
    if (oldUser) {
      throw new Error("Already have an account with this e-mail");
    }

    const newUser = await models.User.create({
      email: email,
      firstName: firstName,
      password: await bcrypt.hash(password, 10),
      lastName: lastName,
      isAdmin: 0,
    });

    const token = createToken(newUser.id);

    res.status(201).json({
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      throw new Error("Sorry,can't find your account");
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    const token = createToken(user.id);
    res.status(200).json({
      user: user,
      token,
    });

    if (!token) {
      throw new Error("Something gone wrong try again later");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleteReturn = await models.User.destroy({
      where: { id: req.params.id },
    });

    if (deleteReturn == 0) {
      throw new Error("User not deleted. Id=" + req.params.id);
    }

    res.status(200).json({
      message: "Your account has been successfully deleted",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  try {
    const userToUpdate = await models.User.update(
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: await bcrypt.hash(password, 10),
      },
      {
        where: { id: req.params.id },
      }
    );

    console.log(userToUpdate);

    if (userToUpdate == 0) {
      throw new Error("User not updated. Id=" + req.params.id);
    }
    res.status(200).json({
      message: "Your account has been updated",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

function createToken(userId) {
  //TODO: use donenv for a value of RANDOM_TOKEN_SECRET

  return (
    "Bearer " +
    jwt.sign({ id: userId }, "RANDOM_TOKEN_SECRET", { expiresIn: "24H" })
  );
}

function validationInput(email, firstName, lastName, password) {
  const email_regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //ou
  //    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const password_regex =
    /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

  if (!email || !firstName || !lastName || !password) {
    throw new Error("Missing parameters");
  }

  if (!email_regex.test(email)) {
    throw new Error("Wrong email format");
  }

  if (!password_regex.test(password)) {
    throw new Error(
      "-At least 8 characters long - Include at least 1 lowercase letter - 1 capital letter - 1 number - 1 special character = !@#$%^&*"
    );
  }
}
