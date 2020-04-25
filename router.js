const express = require("express");
const router = express.Router();
const scraper = require("./scraper");

router.get("/jobs", async (req, res, next) => {
  if(req.hostname === 'localhost'){
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    const role = req.query.role;
    const city = req.query.city;
    const result = await scraper(role, city);
    res.json(result);
  } else {
    res.send('Service can only be accessed from locahost!')
  }
});

module.exports = router;
