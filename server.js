// create server
const express = require("express");
// mongoose library
const mongoose = require("mongoose");
// require our router
const articleRouter = require("./routes/articles");
const app = express();

// connect to mongodb
mongoose.connect("mongodb://localhost/blog");

// set up view engine as ejs
app.set("view engine", "ejs");

// make app use the route
app.use("/articles", articleRouter);

// temp articles
const articles = [
  {
    title: "test article",
    createdAt: new Date(),
    description: "test description",
  },
  {
    title: "test article 2",
    createdAt: new Date(),
    description: "test description",
  },
];

// create index route
app.get("/", (req, res) => {
  res.render("articles/index", { articles: articles });
});

// start the server
app.listen(3000, () => {
  console.log("The server is up and running");
});
