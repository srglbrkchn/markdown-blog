// put all of the routes directly related to our article in here
const express = require("express");
// import db model
const Article = require("./../models/articles");
const router = express.Router();

// create new article route
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) {
    res.redirect("/");
  }
  res.render("articles/show", { article: article });
});

router.post("/", async (req, res) => {
  // fill db by send data through post request
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    // save article intp db
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    // in case of error, render the page we were just on
    res.render("articles/new", { article: article });
  }
});

// delete route
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// export router
module.exports = router;
