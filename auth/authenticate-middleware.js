const Auth = require("./auth-model");
const bcrypt = require("bcryptjs");

function restrict() {
  return async (req, res, next) => {
    try {
      const { username, password } = req.headers;

      if (!username || !password) {
        return res.status(401).json({
          message: "Invalid credentials.",
        });
      }

      const user = await Auth.findBy({ username }).first();

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials.",
        });
      }

      const pwValid = await bcrypt.compare(password, user.password);

      if (!pwValid) {
        return res.status(401).json({
          message: "Invalid credentials.",
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { restrict };
