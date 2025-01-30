const USER = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      msg: "All fields are required",
    });
  }
  await USER.create({
    name,
    email,
    password,
  });
  return res.json({
    msg: "User Created Successfully",
  });
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await USER.findOne({ email, password });
  if (!user) {
    return res.status(400).json({
      error: "Invalid Email or Password",
    });
  }
  //   const sessionId = uuidv4();
  const token = setUser(user);
  res.cookie("uid", token);
  return res.json({
    msg: "Login Success",
  });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
