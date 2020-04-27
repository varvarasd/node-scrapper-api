const express = require("express");
const router = express.Router();
const scraper = require("./scraper");

const jobBoard = process.env.TRUSTED_REQ;

router.get("/jobs", async (req, res, next) => {
  if(req.hostname === jobBoard){
    res.header("Access-Control-Allow-Origin", jobBoard); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    const role = req.query.role;
    const city = req.query.city;
    const result = await scraper(role, city);
    res.json(result);
  } else {
    res.send('You don\'t have permission to access this resource!')
  }
});

module.exports = router;
