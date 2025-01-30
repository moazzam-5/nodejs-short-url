const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visiHistory: [],
    createdBy: req.user._id,
  });

  return res.json({ id: shortId });
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    TotalClicks: result.visiHistory.length,
    Analytics: result.visiHistory,
  });
}
module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
};
