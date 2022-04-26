const { query } = require("express");

// define a client
const Client = require("pg").Client;

// psql user credentials
const credentials = {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
};

// connect to a client
const client = new Client(credentials);
client.connect();

// function returns
const view_jaf = (jaf_id) => {
  return new Promise(function (resolve, reject) {
    var query = "";
    console.log("query: ", query);
    client.query(query, (error, results) => {
      if (error) {
        console.log("err: ", error);
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

module.exports = {
  view_jaf,
};
