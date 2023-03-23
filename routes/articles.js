// put all of the routes directly related to our article in here
const express = require("express");
// import db model
const Article = require("./../models/articles");
const router = express.Router();

// create new article route
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

// edit route
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

// get one article route
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) {
    res.redirect("/");
  }
  res.render("articles/show", { article: article });
});

// post new article
router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

// put route
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

// delete route
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
      // save article intp db
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      // in case of error, render the page we were just on
      res.render(`articles/${path}`, { article: article });
    }
  };
}

// export router
module.exports = router;
