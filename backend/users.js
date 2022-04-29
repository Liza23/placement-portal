const { query } = require("express");
const jwt = require("jsonwebtoken");
const Helper = require("./helper");
// const User = require("user/model")
// define a client
const Client = require("pg").Client;
var format = require('pg-format');


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


	const student_signup = async (req, res) => {
		rno = req.body.rno;
		pwd = req.body.pwd;
		const hashpass = Helper.hashPassword(pwd);
		var query = 'INSERT INTO STUDENT (student_rno, student_password, student_name, student_gender, student_dob, student_email, program_id, department_id) VALUES($1, $2, $3, $4, to_timestamp($5), $6, $7, $8) returning *;';
		try{
			const { rows } = await client.query(query, [rno, hashpass, req.body.name, req.body.gender, req.body.dob, req.body.email, req.body.program_id, req.body.department_id]);
			if(!rows[0]){
				return res.status(400).send({"message" : "cannot insert row"});
			}
			return res.status(200).send({ rows });
		}
		catch(error){
			return res.status(400).send({ error });
		}
	};

	var recruiter_signup = async function(req, res) {
		if(!Helper.isValidEmail(req.body.email)){
			return res.status(400).send({"message" : "invalid email"});
		}
		const hashpass = Helper.hashPassword(req.body.pwd);
		var query = 'INSERT INTO RECRUITER (recruiter_password, recruiter_name, recruiter_email, recruiter_contact) VALUES ($1,$2,$3,$4) returning *;';
		try{
			const { rows } = await client.query(query, [hashpass, req.body.name, req.body.email, req.body.contact]);
			if(!rows[0]){
				return res.status(400).send({"message" : "Cannot sign up the user"});
			}
			return res.status(200).send({"message" : "successful signup"});
		}
		catch(error){
			return res.status(400).send({error});
		}
	};


	/*
	################################################################
	################################################################
	#### Login Queries for Coordinator, student and recruiter ####
	################################################################
	################################################################
	*/

	var student_login = async function(req, res) {
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
	};

	var coordinator_login = async function(req, res) {
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
	};

	var recruiter_login = async function(req, res){
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
	};

module.exports = {student_signup,student_login,coordinator_login,recruiter_login,recruiter_signup};

/*
Kal raat ko jab hum LOTD se nikle the toh nikki ka phone aaya meko, wo bolta db project kitna kia
toh maine chilla ke bola - are ma ki bhosde mein gaya project tu project ki kyu poochh rha hai ye poochh na daaru kitti pee hai
And waha ke saare log humko dekhne lage
And humko hi dekhte rahe jabtak hum nikle
*/