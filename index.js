const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToMongoDb } = require("./connection");

const { restrictLoginUserOnly, checkAuth } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

// MONGO DB CONNECTION
connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongoDb Connected!")
);

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

// ROUTE URl
app.use("/url", restrictLoginUserOnly, urlRoute);

app.get("/detail", checkAuth, async (req, res) => {
  if (!req.user) return res.json({ error: "Unauthorized" });
  const allData = await URL.find({ createdBy: req.user._id });
  return res.json({
    data: allData,
  });
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visiHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectURL);
});

// ROUTE USER
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Listen on Port: ${PORT}`));
