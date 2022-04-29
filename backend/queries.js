const { query } = require("express");
const jwt = require("jsonwebtoken");
import Helper from "./helper";
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


/*
################################################################
################################################################
#### Signup Queries for Coordinator, student and recruiter ####
################################################################
################################################################
*/


const student_signup = (rno, pwd, details) => {
	return new Promise(function(resolve, reject) {
		if(!Helper.isValidEmail(details.email)){
			reject("No Valid Mail");
		}
		const hashpass = Helper.hashPassword(pwd);
		var query = `INSERT INTO STUDENT (student_rno, student_password, student_name, student_gender, student_dob, student_email, program_id, department_id) VALUES(${rno}, '${hashpass}', '${details.name}', '${details.gender}', to_timestamp(${details.dob}/1000.0), '${details.email}', ${details.program}, ${details.department});`;
		client.query(query, (error, results) => {
			if(error){
				console.log("ERROR IN STUDENT SIGNUP\n");
				console.log(error);
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};

const recruiter_signup = (pwd, details) => {
	return new Promise(function(resolve, reject) => {
		if(!Helper.isValidEmail(details.email)){
			reject("No Valid Mail");
		}
		const hashpass = Helper.hashPassword(pwd);
		var query = `INSERT INTO RECRUITER (recruiter_password, recruiter_name, recruiter_email, recruiter_contact) VALUES ('${hashpass}', '${details.name}', '${details.email}', ${details.contact});`;
		client.query(query, (error, results) => {
			if(error){
				console.log("ERROR IN RECRUITER SIGNUP\n");
				console.log(error);
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};


const coordinator_signup = (pwd, details) => {
	return new Promise(function(resolve, reject) => {
		if(!Helper.isValidEmail(details.email)){
			reject("No Valid Mail");
		}
		const hashpass = Helper.hashPassword(pwd);
		var query = `INSERT INTO COORDINATOR (coordinator_password, coordinator_name, coordinator_email, coordinator_contact) VALUES ('${hashpass}', '${details.name}', '${details.email}', ${details.contact});`;
		client.query(query, (error, results) => {
			if(error){
				console.log("ERROR IN COORDINATOR SIGNUP\n");
				console.log(error);
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};


/*
################################################################
################################################################
#### Login Queries for Coordinator, student and recruiter ####
################################################################
################################################################
*/

async student_login(req, res){
	var rno = req.body.rno;
	var pwd = req.body.pwd;

	var q1 = 'SELECT * from STUDENTS where student_rno=$1';
	try{
		const { rows } = await client.query(q1, [rno]);
		if(!rows[0]){
			return res.status(400).send({"message" : "No such student Exists"});
		}
		if(!Helper.comparePassword(rows[0].student_password, pwd)){
			return res.status(400).send({"message" : "Password incorrect"});
		}
		const token = Helper.generateToken(rno);
		return res.status(200).send({ token });
	}
	catch(error){
		return res.status(400).send(error);
	}
}

async coordinator_login(req, res){
	var email = req.body.email;
	var pwd = req.body.pwd;

	var q1 = 'SELECT * from COORDNATOR where coordinator_email=$1';
	try{
		const { rows } = await client.query(q1, [email]);
		if(!rows[0]){
			return res.status(400).send({"message" : "No such student Exists"});
		}
		if(!Helper.comparePassword(rows[0].coordinator_password, pwd)){
			return res.status(400).send({"message" : "Password incorrect"});
		}
		const token = Helper.generateToken(rno);
		return res.status(200).send({ token });
	}
	catch(error){
		return res.status(400).send(error);
	}
}

async recruiter_login(req, res){
	var email = req.body.email;
	var pwd = req.body.pwd;

	var q1 = 'SELECT * from RECRUITER where recruiter_email=$1';
	try{
		const { rows } = await client.query(q1, [email]);
		if(!rows[0]){
			return res.status(400).send({"message" : "No such student Exists"});
		}
		if(!Helper.comparePassword(rows[0].recruiter_password, pwd)){
			return res.status(400).send({"message" : "Password incorrect"});
		}
		const token = Helper.generateToken(rno);
		return res.status(200).send({ token });
	}
	catch(error){
		return res.status(400).send(error);
	}
}


const view_jaf = (jaf_id, company_id, role) => {
	return new Promise(function(resolve, reject){
		if(role == "student" || role == "coordinator" || role == "recruiter"){
				var query = `SELECT company.company_name, profile.profile_name, profile.profile_description, jaf.jaf_jd, jaf.jaf_bond_duration, jaf.jaf_location_of_posting, jaf.jaf_currency, jaf.jaf_gross, jaf.jaf_gross, jaf.jaf_cpi from jaf inner join company on jaf.company_id = company.company_id inner join profile on profile.profile_id = jaf.profile_id where jaf.jaf_id = ${jaf_id} AND company.company_id=${company_id};`;
				console.log("Query incoming");
				console.log(query);
				client.query(query, (error, results) => {
						if(error) {
								console.log("Error in view List JAFs :", error);
								reject(error);
						}
						else{
								console.log(results.rows);
								resolve(results.rows);
						}
				});
		} else{
				console.log("Unexpected Role ---");
		}
	});
};
const view_eligibility = (jaf_id, company_id) => {
	return new Promise(function(resolve,reject){
		var query = `SELECT DEPARTMENT.department_id, DEPARTMENT.department_name, PROGRAM.program_id, PROGRAM.program_name from ELIGIBLE inner join DEPARTMENT on DEPARTMENT.department_id = ELIGIBLE.department_id INNER JOIN program on program.program_id = ELIGIBLE.program_id WHERE jaf_id = ${jaf_id};`;
		client.query(query, (error, results) => {
			if(error){
				console.log("Error in viewing eligibility_details", error);
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		})
	});
};
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
				var query = `UPDATE STUDENT SET student_name = '${name}', gender = '${gender}', dob = ${dob}, contact = ${contact} WHERE  STUDENT.student_rno = ${student_id};`;
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
		var query = `SELECT * from RESUME WHERE student_rno = ${student_id} AND resume_id = ${resume_id};`;
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

		var query = `UPDATE RESUME SET resume_url=${resume_url} WHERE resume_id=${resume_id} AND student_rno=${student_id}; INSERT INTO RESUME (student_rno, resume_id, resume_url) VALUES(${student_id}, ${resume_id}, ${resume_url}) WHERE NOT EXISTS (SELECT 1 FROM RESUME WHERE resume_id=${resume_id} AND student_rno=${student_id});`
		// var query = `UPDATE RESUME SET resume_url = ${resume_url} WHERE resume_id = ${resume_id} AND student_rno = ${student_id};`;
		// var ins_query = `INSERT INTO RESUME (resume_id, student_rno, resume_url) VALUES (${resume_id}, ${student_id}, ${resume_url});`;
		client.query(query, (error, results) => {
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

				var query = `INSERT into APPLIES_FOR (student_rno, jaf_id, resume_id, date_time) VALUES (${rno}, ${jaf_id}, ${resume_id}, current_timestamp);`;
				console.log(query);
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
		var query = `SELECT APPLIES_FOR.jaf_id, JAF.company_id FROM APPLIES_FOR INNER JOIN JAF on JAF.jaf_id = APPLIES_FOR.jaf_id WHERE APPLIES_FOR.student_rno = ${student_id};`;
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
		var query = `SELECT OFFERS.jaf_id, OFFERS.company_id from OFFERS INNER JOIN JAF on JAF.jaf_id = OFFERS.jaf_id WHERE OFFERS.student_rno = ${student_id};`;
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
		var query = "INSERT INTO SHORTLIST (student_rno, jaf_id) VALUES \%L";
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
		var query = "INSERT INTO OFFER (student_rno, jaf_id) VALUES \%L";
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
	profile_id = jaf_details.profile_id;
	company_id = jaf_details.company_id;
	jaf_jd = jaf_details.jd;
	jaf_bond_duration = jaf_details.bond_duration;
	jaf_location = jaf_details.location;
	jaf_ctc = jaf_details.ctc;
	jaf_gross = jaf_details.gross;
	jaf_cpi = jaf_details.cpi;
	jaf_bonus_allowed = jaf_details.bonus_allowed;
	jaf_currency = jaf_details.currency;
	return new Promise(function(resolve, reject) {
		var query = `INSERT INTO JAF (profile_id, company_id, jaf_jd, jaf_bond_duration, jaf_location_of_posting, jaf_ctc, jaf_gross, jaf_cpi, jaf_bonus_allowed, jaf_currency) VALUES (${profile_id}, ${company_id}, '${jaf_jd}', ${jaf_bond_duration}, '${jaf_location}', ${jaf_ctc}, ${jaf_gross}, ${jaf_cpi}, '${jaf_bonus_allowed}', '${jaf_currency}');`;
		console.log(query);
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
const add_eligibility = (jaf_id, dep_ids, prog_ids) => {
	return new Promise(function(resolve, reject) {
		eligibility_details = [];
		for(let i=0;i<dep_ids.length;i++){
			eligibility_details.push([jaf_id, dep_ids[i], prog_ids[i]]);
		}
		var query = `DELETE FROM ELIGIBLE WHERE jaf_id = ${jaf_id}; INSERT into ELIGIBLE (jaf_id, department_id, program_id) VALUES \%L`;
		client.query(format(query, eligibility_details), (error, results) => {
			if(error){
				console.log("Error in adding eligibility_details", error);
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};
const create_company = (name, origin, coordinator_id) => {
	return new Promise(function(resolve,reject){
		var query = `INSERT INTO COMPANY(company_name, company_origin, company_coordinator) VALUES ('${name}', '${origin}', ${coordinator_id});`;
		console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
		console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
		console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
		console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
		console.log(query);
		client.query(query, (error, results) => {
			if(error){
				console.log("Error in creating company", error);
				reject(error);
			}
			else
			{
				resolve(results.rows);
			}
		});
	});
};
const assign_company = (recruiter_id, company_id) => {
	return new Promise(function(resolve, reject) {
		var query = `UPDATE RECRUITER SET recruiter_company=${company_id} WHERE recruiter_id=${recruiter_id};`;
		client.query(query, (error,results)=>{
			if(error){
				console.log("Error in assigning company", error);
				reject(error);
			}
			else
				resolve(results.rows);

		});
	});
};
const open_jaf = (jaf_id, open_time) => {
	return new Promise(function(resolve, reject) {
		var query = `UPDATE JAF SET jaf_opened_on=to_timestamp(${open_time}/1000.0);`;
		client.query(query, (error, results) => {
			if(error){
				console.log("Cannot Open JAF", error);
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};
const close_jaf = (jaf_id, close_time) => {
	return new Promise(function(resolve, reject) {
		var query = `UPDATE JAF SET jaf_closed_on=to_timestamp(${close_time}/1000.0);`;
		client.query(query, (error, results) => {
			if(error){
				console.log("Cannot Close JAF", error);
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};
const add_slot = (jaf_id, slot) => {
	return new Promise(function(resolve, reject) {
		var query = `UPDATE JAF SET jaf_slot=${slot};`;
		client.query(query, (error, results) => {
			if(error){
				console.log("Cannot Add slot", error);
				reject(error);
			}
			else{
				resolve(results.rows);
			}
		});
	});
};
const view_student_list = () => {
	return new Promise(function(resolve,reject) {
		var query = `SELECT student_rno, student_name, student_cpi, program.program_name, department.department_name from STUDENT INNER JOIN PROGRAM ON STUDENT.program_id = PROGRAM.program_id INNER JOIN DEPARTMENT ON STUDENT.department_id = DEPARTMENT.department_id;`;
		client.query(query, (error, results) => {
			if(error){
				console.log("Error while viewing student list", error);
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
	view_student_list,
	add_slot,
	close_jaf, 
	open_jaf,
	assign_company,
	create_company,
	add_eligibility, 
	create_jaf,
	create_offers,
	create_shortlist,
	view_offers,
	view_shortlists,
	student_upload_resume,
	student_view_resume,
	edit_student_profile,
};
