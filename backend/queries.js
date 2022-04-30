const { query } = require("express");
const jwt = require("jsonwebtoken");
const Helper = require("./helper");
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




const view_jaf = (jaf_id, company_id, role) => {
	return new Promise(function (resolve, reject) {
		if (role == "student" || role == "coordinator" || role == "recruiter") {
			var query = `SELECT company.company_name, profile.profile_name, profile.profile_description, jaf.jaf_jd, jaf.jaf_bond_duration, jaf.jaf_location_of_posting, jaf.jaf_currency, jaf.jaf_gross, jaf.jaf_gross, jaf.jaf_cpi from jaf inner join company on jaf.company_id = company.company_id inner join profile on profile.profile_id = jaf.profile_id where jaf.jaf_id = ${jaf_id} AND company.company_id=${company_id};`;
			console.log("Query incoming");
			console.log(query);
			client.query(query, (error, results) => {
				if (error) {
					console.log("Error in view List JAFs :", error);
					reject(error);
				}
				else {
					console.log(results.rows);
					resolve(results.rows);
				}
			});
		} else {
			console.log("Unexpected Role ---");
		}
	});
};
const view_eligibility = (jaf_id, company_id) => {
	return new Promise(function (resolve, reject) {
		var query = `SELECT DEPARTMENT.department_id, DEPARTMENT.department_name, PROGRAM.program_id, PROGRAM.program_name from ELIGIBLE inner join DEPARTMENT on DEPARTMENT.department_id = ELIGIBLE.department_id INNER JOIN program on program.program_id = ELIGIBLE.program_id WHERE jaf_id = ${jaf_id};`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in viewing eligibility_details", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		})
	});
};

const view_company_profile = (company_id) => {
	return new Promise(function (resolve, reject) {
		var query = "select * from company where company_id = " + company_id;
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
		var query = "select * from student inner join department on student.department_id = department.department_id inner join program on student.program_id = program.program_id where student_rno = " + student_id;
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

const view_department = (department_id) => {
	return new Promise(function (resolve, reject) {
		var query = "select * from department where department_id = " + department_id;
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

const view_program = (program_id) => {
	return new Promise(function (resolve, reject) {
		var query = "select * from program where program_id = " + program_id;
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

const edit_student_profile = (student_id, name, gender, contact) => {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE STUDENT SET student_name = '${name}', student_gender = '${gender}', student_contact = ${contact} WHERE  STUDENT.student_rno = ${student_id};`;
		console.log(query);
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in edit student profile\n");
				console.log(error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};

const edit_recrutier_profile = (id, name, email, contact) => {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE RECRUITER SET recruiter_name = '${name}', recruiter_email = '${email}', recruiter_contact = ${contact} WHERE recruiter_id = ${id};`;
		console.log(query);
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in edit recruiter profile\n");
				console.log(error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};

const edit_coordinator_profile = (coordinator_id,name, email, contact) => {
    return new Promise(function (resolve, reject) {
            var query = `UPDATE coordinator SET coordinator_name = '${name}', coordinator_email = '${email}', coordinator_contact = ${contact} WHERE  coordinator.coordinator_id = ${coordinator_id};`;
            console.log(query);
            client.query(query, (error, results) => {
                    if(error){
                            console.log("Error in edit coordinator profile\n");
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
	return new Promise(function (resolve, reject) {
		var query = `SELECT * from RESUME WHERE student_rno = ${student_id} AND resume_id = ${resume_id};`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in view resume", error);
			}
			else {
				resolve(results.rows);
			}

		});
	});
};
const student_upload_resume = (student_id, resume_id, resume_url) => {
	return new Promise(function (resolve, reject) {

		var query = `UPDATE RESUME SET resume_url=${resume_url} WHERE resume_id=${resume_id} AND student_rno=${student_id}; INSERT INTO RESUME (student_rno, resume_id, resume_url) VALUES(${student_id}, ${resume_id}, ${resume_url}) WHERE NOT EXISTS (SELECT 1 FROM RESUME WHERE resume_id=${resume_id} AND student_rno=${student_id});`
		// var query = `UPDATE RESUME SET resume_url = ${resume_url} WHERE resume_id = ${resume_id} AND student_rno = ${student_id};`;
		// var ins_query = `INSERT INTO RESUME (resume_id, student_rno, resume_url) VALUES (${resume_id}, ${student_id}, ${resume_url});`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("INSERTING RESUME GIVES ERROR\n");
				console.log(error);
				reject(error);
			}
			else {
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
			"select * from company where company_coordinator = " +
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

const view_company_recruiter = (recruiter_id) => {
	return new Promise(function (resolve, reject) {
		var query =
			"select * from company inner join recruiter on company.company_id = recruiter.recruiter_company where recruiter_id = " +
			recruiter_id +
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

const view_all_recuriters = (recruiter_id) => {
	return new Promise(function (resolve, reject) {
		var query =
			"select a.recruiter_id, a.recruiter_name, a.recruiter_email, a.recruiter_contact from recruiter as a INNER JOIN recruiter as b ON a.recruiter_company=b.recruiter_company where b.recruiter_id=" + recruiter_id + "and a.recruiter_id!=b.recruiter_id";
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
	return new Promise(function (resolve, reject) {
		if (role != "student") {
			console.log("Error in sign_jaf :: role not student");
		}

		var query = `INSERT into APPLIES_FOR (student_rno, jaf_id, resume_id, date_time) VALUES (${rno}, ${jaf_id}, ${resume_id}, current_timestamp);`;
		console.log(query);
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in Applying for JAF::", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};
const view_shortlists = (student_id) => {
	return new Promise(function (resolve, reject) {
		var query = `SELECT APPLIES_FOR.jaf_id, JAF.company_id FROM APPLIES_FOR INNER JOIN JAF on JAF.jaf_id = APPLIES_FOR.jaf_id WHERE APPLIES_FOR.student_rno = ${student_id};`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in viewing shortlists, ", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};
const view_offers = (student_id) => {
	return new Promise(function (resolve, reject) {
		var query = `SELECT OFFERS.jaf_id, OFFERS.company_id from OFFERS INNER JOIN JAF on JAF.jaf_id = OFFERS.jaf_id WHERE OFFERS.student_rno = ${student_id};`;
		client.query(query, (error, results) => {
			if (error) {
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
	return new Promise(function (resolve, reject) {
		student_and_jaf_data = [];
		student_ids.forEach(function (v) {
			student_and_jaf_data.push([v, jaf_id]);
		});
		var query = "INSERT INTO SHORTLIST (student_rno, jaf_id) VALUES \%L";
		client.query(format(query, student_and_jaf_data), (error, results) => {
			if (error) {
				console.log(error);
				console.log("Error at create_shortlist");
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};
const create_offers = (jaf_id, student_ids) => {
	return new Promise(function (resolve, reject) {
		student_and_jaf_data = [];
		student_ids.forEach(function (v) {
			student_and_jaf_data.push([v, jaf_id]);
		});
		var query = "INSERT INTO OFFER (student_rno, jaf_id) VALUES \%L";
		client.query(format(query, student_and_jaf_data), (error, results) => {
			if (error) {
				console.log(error);
				console.log("Error at create_shortlist");
				reject(error);
			}
			else {
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
	return new Promise(function (resolve, reject) {
		var query = `INSERT INTO JAF (profile_id, company_id, jaf_jd, jaf_bond_duration, jaf_location_of_posting, jaf_ctc, jaf_gross, jaf_cpi, jaf_bonus_allowed, jaf_currency) VALUES (${profile_id}, ${company_id}, '${jaf_jd}', ${jaf_bond_duration}, '${jaf_location}', ${jaf_ctc}, ${jaf_gross}, ${jaf_cpi}, '${jaf_bonus_allowed}', '${jaf_currency}');`;
		console.log(query);
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error creating JAF", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};
const add_eligibility = (jaf_id, dep_ids, prog_ids) => {
	return new Promise(function (resolve, reject) {
		eligibility_details = [];
		for (let i = 0; i < dep_ids.length; i++) {
			eligibility_details.push([jaf_id, dep_ids[i], prog_ids[i]]);
		}
		var query = `DELETE FROM ELIGIBLE WHERE jaf_id = ${jaf_id}; INSERT into ELIGIBLE (jaf_id, department_id, program_id) VALUES \%L`;
		client.query(format(query, eligibility_details), (error, results) => {
			if (error) {
				console.log("Error in adding eligibility_details", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};
const create_company = (name, origin, coordinator_id) => {
	return new Promise(function (resolve, reject) {
		var query = `INSERT INTO COMPANY(company_name, company_origin, company_coordinator) VALUES ('${name}', '${origin}', ${coordinator_id});`;
		console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
		console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
		console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
		console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
		console.log(query);
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in creating company", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};
const assign_company = (recruiter_id, company_id) => {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE RECRUITER SET recruiter_company=${company_id} WHERE recruiter_id=${recruiter_id};`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in assigning company", error);
				reject(error);
			}
			else
				resolve(results.rows);

		});
	});
};
const open_jaf = (jaf_id, open_time) => {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE JAF SET jaf_opened_on=to_timestamp(${open_time}/1000.0);`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Cannot Open JAF", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};
const close_jaf = (jaf_id, close_time) => {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE JAF SET jaf_closed_on=to_timestamp(${close_time}/1000.0);`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Cannot Close JAF", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};
const add_slot = (jaf_id, slot) => {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE JAF SET jaf_slot=${slot};`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Cannot Add slot", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};
const view_student_list = () => {
	return new Promise(function (resolve, reject) {
		var query = `SELECT * from STUDENT INNER JOIN PROGRAM ON STUDENT.program_id = PROGRAM.program_id INNER JOIN DEPARTMENT ON STUDENT.department_id = DEPARTMENT.department_id;`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error while viewing student list", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};
const student_dept_stats = () => {
	return new Promise(function (resolve, reject) {
		var query = `select department_name, count(*) as tot_students from student inner join department on student.department_id = department.department_id group by department_name`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error while viewing student department stats", error);
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};

// dep wise number of students
// program wise number of students
// dep program mein list of students placed and unplaced
// dep mein list of students placed, unplaced

const student_count_by_department = () => {
	return new Promise(function (resolve, reject) {
		var query = `select dc*1.0/(select count(*) from student), department_id from (select count(*) as dc, department_id from student group by department_id) as df1;`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error while viewing students numbers");
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};

const student_count_by_program = () => {
	return new Promise(function (resolve, reject) {
		var query = `select dc*1.0/(select count(*) from student), program_id from (select count(*) as dc, program_id from student group by program_id) as df1;`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error while viewing students numbers");
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};

const placed_students_for_depID = (department_id) => {
	return new Promise(function (resolve, reject) {
		var query = `select student_name, student_rno, student_email from student where allocated_jaf is not null and department_id = ${department_id};`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in getting placed students");
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};

const unplaced_students_for_depID = (department_id) => {
	return new Promise(function (resolve, reject) {
		var query = `select student_name, student_rno, student_email from student where allocated_jaf is null and department_id = ${department_id};`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in getting placed students");
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};


const placed_students_for_progID = (program_id) => {
	return new Promise(function (resolve, reject) {
		var query = `select student_name, student_rno, student_email from student where allocated_jaf is not null and program_id = ${program_id};`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in getting placed students");
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};

const unplaced_students_for_programID = (program_id) => {
	return new Promise(function (resolve, reject) {
		var query = `select student_name, student_rno, student_email from student where allocated_jaf is null and program_id = ${program_id};`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in getting placed students");
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};

const list_open_jafs = () => {
	return new Promise(function (resolve, reject) {
		var query = `select jaf.jaf_id, jaf.company_id, company.company_name, jaf.jaf_jd, jaf.jaf_opened_on, jaf.jaf_closed_on from jaf inner join company on company.company_id = jaf.company_id where jaf.jaf_opened_on is not null and jaf.jaf_opened_on < current_timestamp AND (jaf.jaf_closed_on is null or jaf.jaf_closed_on > current_timestamp);`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in list open jafs");
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});

	});
};

const list_eligible_jafs = (rno) => {
	return new Promise(function (resolve, reject) {
		var query = `select jaf.jaf_id, jaf.company_id, company.company_name, jaf.jaf_jd, jaf.jaf_opened_on, jaf.jaf_closed_on from jaf inner join company on company.company_id = jaf.company_id inner join eligible on jaf.jaf_id = ELIGIBLE.jaf_id inner join student on student.program_id = ELIGIBLE.program_id AND student.department_id = eligible.department_id where jaf.jaf_opened_on is not null and jaf.jaf_opened_on < current_timestamp AND (jaf.jaf_closed_on is null or jaf.jaf_closed_on > current_timestamp) and student.student_rno = ${rno} and (jaf.jaf_cpi is null or student.student_cpi >= jaf.jaf_cpi);`;
		client.query(query, (error, results) => {
			if (error) {
				console.log("Error in list open jafs");
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});

	});
};

const list_applied_jafs = (rno) => {
	return new Promise(function (resolve, reject) {
		var query = `select APPLIES_FOR.jaf_id, jaf.jaf_jd, jaf.company_id, company.company_name from APPLIES_FOR inner join jaf on APPLIES_FOR.jaf_id = jaf.jaf_id inner join company on company.company_id = jaf.company_id where APPLIES_FOR.student_rno=${rno};`;
		client.query(query, (error, results) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(results.rows);
			}
		});
	});
};

const list_created_jafs = (rid) => {
	return new Promise(function(resolve, reject){
		var query = `select jaf.jaf_id, jaf.profile_id, profile.profile_name, company.company_name, jaf.jaf_opened_on, jaf.jaf_closed_on from jaf inner join recruiter on jaf.company_id = recruiter.recruiter_company inner join company on recruiter.recruiter_company=company.company_id inner join profile on jaf.profile_id=profile.profile_id where recruiter.recruiter_id=${rid};`;
	})
}


module.exports = {
	view_recuriter_profile,
	view_student_profile,
	view_coordinator_profile,
	view_applicants,
	view_department,
	view_program,
	view_company_profile,
	view_company_coordinator,
	view_company_recruiter,
	view_all_recuriters,
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
	edit_recrutier_profile,
	edit_coordinator_profile,
	list_applied_jafs,
	list_eligible_jafs,
	list_open_jafs,
	unplaced_students_for_programID,
	placed_students_for_progID,
	unplaced_students_for_depID,
	placed_students_for_depID,
	student_count_by_department,
	student_count_by_program,
	list_created_jafs
};
