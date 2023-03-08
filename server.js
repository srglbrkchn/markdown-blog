// create server
const express = require("express");
// require our router
const articleRouter = require("./routes/articles");
const app = express();

// set up view engine as ejs
app.set("view engine", "ejs");

// make app use the route
app.use("/articles", articleRouter);

// create index route
app.get("/", (req, res) => {
  res.render("index");
});

// start the server
app.listen(3000, () => {
  console.log("The server is up and running");
});
