const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken, jwtAuthMiddleware } = require("../middleware/jwt");

//@desc User Signin
//@route POST /api/users/signin
router.post("/signin", async (req, res) => {
  try {
    const data = req.body;
    const exist = await User.findOne({ email: data.email });
    if (exist) {
      return res.status(400).json({ message: "User already exist" });
    }
    let newUser = new User(data);
    //Hashing the Password
    const saltRounds = 10;
    const hashpass = async (plainpass) => {
      const hash = await bcrypt.hashSync(plainpass, saltRounds);
      return hash;
    };
    newUser.password = await hashpass(newUser.password);
    const response = await newUser.save();
    console.log(response);
    const payload = {
      id: response._id,
    }
    const token = generateToken(payload);
    console.log(token);
    res.status(200).json({ message: "User Created",response ,token: token });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

//@desc User Login
//@route POST /api/users/login
router.post("/login", async (req, res) => {
  const comparePass = (plainPass, hashPass) => {
    const match = bcrypt.compareSync(plainPass, hashPass);
    return match;
  };
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const match =await comparePass(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const payload = {
      id: user._id,
    }
    const token = generateToken(payload);
    res.status(200).json({ message: "User Logged In",user ,token: token });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;
