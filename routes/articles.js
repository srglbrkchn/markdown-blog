// put all of the routes directly related to our article in here
const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Halloshcen!");
});

// export router
module.exports = router;
