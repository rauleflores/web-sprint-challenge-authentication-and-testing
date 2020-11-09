const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authUser = require("./auth-model");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        message: "Username and Password required.",
      });
    }

    const user = await authUser.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken.",
      });
    }

    const newUser = await authUser.addUser({
      username: username,
      // password: password,
      password: await bcrypt.hash(password, 15),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        message: "Username and Password required.",
      });
    }
    const user = await authUser.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "Invalid login credentials.",
      });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(401).json({
        message: "Invalid login credentials.",
      });
    }

    res.json({
      message: `Welcome, ${user.username}!`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
