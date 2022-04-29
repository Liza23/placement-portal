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

const verifyStudents = (req, res) => {
	const token = req.headers['x-access-token'];
	if(!token){
		return res.status(400).send({"message" : "No Token provided"});
	}
	try {
		const decoded = await jwt.verify(token, process.env.SECRET);
		const query = 'SELECT * from STUDENT WHERE student_rno=$1';
		const { rows } = await client.query(query, [decoded.userID]);
		if(!rows[0]) {
			return res.status(400).send({"message" : "No user matches token"});
		}
		req.rno = decoded.userID;
		next();
	} catch(error) {
		return res.status(400).send(error);
	}
}

const verifyRecruiter = (req, res) => {
	const token = req.headers['x-access-token'];
	if(!token){
		return res.status(400).send({"message" : "No Token provided"});
	}
	try {
		const decoded = await jwt.verify(token, process.env.SECRET);
		const query = 'SELECT * from RECRUITER WHERE recruiter_id=$1';
		const { rows } = await client.query(query, [decoded.userID]);
		if(!rows[0]) {
			return res.status(400).send({"message" : "No user matches token"});
		}
		req.rid = decoded.userID;
		next();
	} catch(error) {
		return res.status(400).send(error);
	}
}


const verifyCoordinator = (req, res) => {
	const token = req.headers['x-access-token'];
	if(!token){
		return res.status(400).send({"message" : "No Token provided"});
	}
	try {
		const decoded = await jwt.verify(token, process.env.SECRET);
		const query = 'SELECT * from COORDNATOR WHERE coordinator_id=$1';
		const { rows } = await client.query(query, [decoded.userID]);
		if(!rows[0]) {
			return res.status(400).send({"message" : "No user matches token"});
		}
		req.rid = decoded.userID;
		next();
	} catch(error) {
		return res.status(400).send(error);
	}
}


module.exports = [
	verifyStudents,
	verifyCoordinator,
	verifyRecruiter,
]