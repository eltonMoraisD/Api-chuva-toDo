const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json");

const User = require("../models/user");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async register(req, res) {
    const { email } = req.body;
    try {
      const userEmail = await User.findOne({ email });
      if (userEmail)
        return res.status(400).json({ error: "User already exists" });

      const user = await User.create(req.body);

      user.password = undefined;

      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: "Registration Failed" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");

      if (!user)
        return res.status(400).json({ error: "Error, authenticate fail!" });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ error: "Error, authenticate fail!" });

      user.password = undefined;

      return res.json({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async updateUser(req, res) {
    const { oldPassword, password } = req.body;
    const user = await User.findById(req.userId).select("+password");

    if (oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({
        message: "Password does not match",
      });
    }

    if (password) {
      const passwordHash = bcrypt.hashSync(password, 10);

      await user.updateOne({
        ...req.body,
        password: passwordHash,
      });
    } else {
      await user.updateOne({
        ...req.body,
      });
    }

    return res.json({
      ...req.body,
      oldPassword: undefined,
      password: undefined,
    });
  },

  async deleteUser(req, res) {
    const user = await User.findOneAndDelete(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.json({ message: "User deleted" });
  },
};
