const jwt = require("jsonwebtoken");
const secret = "Moazzam!1";

function setUser(user) {
  //   const payload = {
  //     _id: user._id,
  //     emai: user.emai,
  //   };
  return jwt.sign(
    {
      _id: user._id,
      emai: user.emai,
    },
    secret
  );
}
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
