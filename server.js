// create server
const express = require("express");
// mongoose library
const mongoose = require("mongoose");
// pull in article model
const Article = require("./models/articles");
// require our router
const articleRouter = require("./routes/articles");
// include method-override library to override form methods
const methodOverride = require("method-override");
const app = express();

// connect to mongodb
mongoose.connect("mongodb://localhost/blog");

// set up view engine as ejs
app.set("view engine", "ejs");

// access data from req.body
app.use(express.urlencoded({ extended: false }));

// use method-override
app.use(methodOverride("_method"));

// create index route
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

// make app use the route
app.use("/articles", articleRouter);

// start the server
app.listen(3000, () => {
  console.log("The server is up and running");
});
