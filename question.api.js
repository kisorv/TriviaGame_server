const express = require("express");
const questionsRoute = express.Router();
const pool = require("../trivia_server/connection");

questionsRoute.get("/questions", (req, res) => {
  pool
    .query("select * from questions order by random() limit 10")
    .then(result => {
      res.send(result.rows);
    });
});

module.exports = questionsRoute;
