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

const view_jaf = (jaf_id, company_id, role) => {
  return new Promise(function(resolve, reject) => {
    if(role == "student" || role == "coordinator" || role == "recruiter"){
        query = `SELECT company.company_name, profile.profile_name, profile.profile_description, jaf.jaf_jd, jaf.jaf_bond_duration, jaf.jaf_location_of_posting, jaf.jaf_currency, jaf.jaf_gross, jaf.jaf_gross, jaf.jaf_cpi from jaf inner join company on jaf.company_id = company.company_id inner join profile on profile.profile_id = jaf.profile_id where jaf.jaf_id = ${jaf_id} AND company.company_id=${company_id};`;
        client.query(query, (error, results) => {
            if(error) {
                console.log("Error in view List JAFs :", error);
                reject(error);
            }
            else{
                resolve(results.rows);
            }
        });
    } else{
        console.log("Unexpected Role ---");
    }
  });
};


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

const sign_jaf = (jaf_id, company_id, rno, resume_id, role) => {
    return new Promise(function(resolve, reject) => {
        if(role != "student"){
            console.log("Error in sign_jaf :: role not student");
        }

        query = `INSERT into APPLIES_FOR (student_rollno, jaf_id, resume_id) VALUES (${rno}, ${jaf_id}, ${resume_id});`;
        client.query(query, (error, results) => {
            if(error){
                console.log("Error in Applying for JAF::", error);
                reject(error);
            }
            else{
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
  view_jaf,
  sign_jaf,
  
};
