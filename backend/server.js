// connecting to express backend
const { query } = require("express");
const express = require("express");
const app = express();
const port = 5000;

// load all queries
const queries = require("./queries");

// allow CORS Controls i.e to send and recieve frontend/ backend data
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

// console app listens on $port
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

// calling the functions: view_jaf
app.get("/view_jaf", (req, res) => {
    console.log(req.params.id);
    queries
      .view_jaf(req.params.id)
      .then((response) => {
        console.log(response);
        res.status(200).send(response);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  });
  