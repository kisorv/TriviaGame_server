const express = require("express");
const scoresRoute = express.Router();
const pool = require("../trivia_server/connection");

function selectAllScores(req, res) {
  pool
    .query("select * from scores order by score desc limit 5")
    .then(result => {
      res.send(result.rows);
    });
}

scoresRoute.get("/scores", selectAllScores);

scoresRoute.post("/scores", (req, res) => {
  pool
    .query("insert into scores (username, score) values ($1::text, $2::int)", [
      req.body.username,
      req.body.score
    ])
    .then(() => {
      selectAllScores(req, res);
    });
});

module.exports = scoresRoute;
