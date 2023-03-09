// put all of the routes directly related to our article in here
const express = require("express");
const router = express.Router();

// create new article route
router.get("/new", (req, res) => {
  res.render("articles/new");
});

router.post("/", (req, res) => {});

// export router
module.exports = router;
