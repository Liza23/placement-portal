const { query } = require("express");
const jwt = require("jsonwebtoken");
// const User = require("user/model")
// define a client
const Client = require("pg").Client;
var format = require('pg-format');


// psql user credentials
const credentials = {
	user: "postgres",
	host: "localhost",
	database: "placement_portal",
	password: "newpassword",
	port: 5432,
};

// connect to a client
const client = new Client(credentials);
client.connect();

// function returns

// const signup = (username, password, role) => {

// }



const view_jaf = (jaf_id, company_id, role) => {
	return new Promise(function(resolve, reject){
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

const edit_student_profile = (student_id, name, gender, dob, contact) => {
		return new Promise(function (resolve, reject) {
				var query = `UPDATE STUDENT SET STUDENT.student_name = ${name}, SET STUDENT.gender = ${gender}, SET STUDENT.dob = ${dob}, SET STUDENT.contact = ${contact} WHERE  STUDENT.student_rno = ${student_id};`;
				client.query(query, (error, results) => {
						if(error){
								console.log("Error in edit student profile\n");
								console.log(error);
								reject(error);
						}
						else{
								resolve(results.rows);
						}
				});
		});
};


const student_view_resume = (student_id, resume_id) => {
	return new Promise(function(resolve, reject) {
		var query = `SELECT * from RESUME WHERE RESUME.student_rno = ${student_id} AND RESUME.resume_id = ${resume_id};`;
		client.query(query, (error, results) => {
			if(error){
				console.log("Error in view resume", error);
			}
			else{
				resolve(results.rows);
			}

		});
	});
};

const student_upload_resume = (student_id, resume_id, resume_url) => {
	return new Promise(function(resolve, reject) {
		var query = `UPDATE RESUME SET RESUME.resume_url = ${resume_url} WHERE RESUME.resume_id = ${resume_id} AND RESUME.student_rno = ${student_id};`;
		var ins_query = `INSERT INTO RESUME (resume_id, student_rno, resume_url) VALUES (${resume_id}, ${student_id}, ${resume_url});`;
		client.query(var_ins_query, (error, results) => {
			if(error){
				console.log("INSERTING RESUME GIVES ERROR\n");
				console.log(error);
				reject(error);
			}
			else{
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
		return new Promise(function(resolve, reject)  {
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

const view_shortlists = (student_id) => {
	return new Promise(function(resolve, reject)  {
		query = `SELECT APPLIES_FOR.jaf_id, JAF.company_id FROM APPLIES_FOR INNER JOIN JAF on JAF.jaf_id = APPLIES_FOR.jaf_id WHERE APPLIES_FOR.student_rno = ${student_id};`;
		client.query(query, (error, results) => {
			if(error){
				console.log("Error in viewing shortlists, ", error);
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};

const view_offers = (student_id) => {
	return new Promise(function(resolve, reject) {
		query = `SELECT OFFERS.jaf_id, OFFERS.company_id from OFFERS INNER JOIN JAF on JAF.jaf_id = OFFERS.jaf_id WHERE OFFERS.student_rno = ${student_id};`;
		client.query(query, (error, results) => {
			if(error){
				console.log("View offers has error", error);
				reject(error);
			}
			else {
				resolve(results.row);
			}
		});
	});
};

const create_shortlist = (jaf_id, student_ids) => {
	return new Promise(function(resolve, reject) {
		student_and_jaf_data = [];
		student_ids.forEach(function(v) {
			student_and_jaf_data.push([v, jaf_id]);
		});
		query = "INSERT INTO SHORTLIST (student_rno, jaf_id) VALUES \%L";
		client.query(format(query, student_and_jaf_data), (error, results)=> {
			if(error){
				console.log(error);
				console.log("Error at create_shortlist");
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};

const create_offers = (jaf_id, student_ids) => {
	return new Promise(function(resolve, reject) {
		student_and_jaf_data = [];
		student_ids.forEach(function(v)  {
			student_and_jaf_data.push([v, jaf_id]);
		});
		query = "INSERT INTO OFFERS (student_rno, jaf_id) VALUES \%L";
		client.query(format(query, student_and_jaf_data), (error, results)=> {
			if(error){
				console.log(error);
				console.log("Error at create_shortlist");
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};

const create_jaf = (jaf_details) => {
	profile_id = jaf_details["profile_id"];
	company_id = jaf_details["company_id"];
	jaf_jd = jaf_details["jd"];
	jaf_bond_duration = jaf_details["bond_duration"];
	jaf_location = jaf_details["location"];
	jaf_ctc = jaf_details["currency"];
	jaf_gross = jaf_details["gross"];
	jaf_cpi = jaf_details["cpi"];
	jaf_bonus_allowed = jaf_details["bonus_allowed"];
	return Promise(function(resolve, reject) {
		query = `INSERT INTO JAF (profile_id, company_id, jaf_jd, jaf_bond_duration, jaf_location, jaf_ctc, jaf_gross, jaf_cpi, jaf_bonus_allowed) VALUES (${profile_id}, ${company_id}, ${jaf_jd}, ${jaf_bond_duration}, ${jaf_location}, ${jaf_ctc}, ${jaf_gross}, ${jaf_cpi}, ${jaf_bonus_allowed});`;
		client.query(query, (error, results) => {
			if(error){
				console.log("Error creating JAF", error);
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};

// const add_eligibility = (jaf_id, eligibility) => {
// 	return new Promise(function(resolve, reject) => {

// 	})
// }


module.exports = {
	view_recuriter_profile,
	view_student_profile,
	view_coordinator_profile,
	view_applicants,
	view_company_coordinator,
	view_jaf,
	sign_jaf,

};
