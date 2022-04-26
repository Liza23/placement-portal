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

// function returns recuriter profile
const view_recuriter_profile = (recruiter_id) => {
  return new Promise(function (resolve, reject) {
    var query = "select * from recruiter where recruiter_id = " + recruiter_id;
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

// function returns student profile
const view_student_profile = (student_id) => {
  return new Promise(function (resolve, reject) {
    var query = "select * from student where student_rno = " + student_id;
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

// function returns coordinator profile
const view_coordinator_profile = (coordinator_id) => {
  return new Promise(function (resolve, reject) {
    var query =
      "select * from coordinator where coordinator_id = " + coordinator_id;
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

// function returns student applied to a jaf
const view_applicants = (jaf_id, recuriter_id) => {
  return new Promise(function (resolve, reject) {
    var query =
      "select student.student_name, student.student_rno, student.student_cpi from recruiter inner join jaf on recruiter.recruiter_company = jaf.company_id inner join applies_for on jaf.jaf_id = applies_for.jaf_id inner join student on applies_for.student_rno = student.student_rno where jaf.jaf_id = " +
      jaf_id +
      " and recruiter.recruiter_id = " +
      recuriter_id +
      "";
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

// function returns all companies allotted to a coordinator
const view_company_coordinator = (coordinator_id) => {
  return new Promise(function (resolve, reject) {
    var query =
      "select company_name from company where company_coordinator = " +
      coordinator_id +
      "";
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
  view_recuriter_profile,
  view_student_profile,
  view_coordinator_profile,
  view_applicants,
  view_company_coordinator,
};
