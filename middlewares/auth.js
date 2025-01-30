const { getUser } = require("../services/auth");

async function restrictLoginUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.json({ error: "Please login first" });
  const user = getUser(userUid);
  if (!user) return res.json({ error: "Please login first" });
  req.user = user;
  next();
}
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = { restrictLoginUserOnly, checkAuth };
