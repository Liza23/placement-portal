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

const 

module.exports = {
  view_jaf,
};
