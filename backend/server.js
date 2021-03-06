// connecting to express backend
// import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it working

const { query } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// load all queries
const queries = require("./queries");
const users = require("./users");

const auths = require("./auth");


app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/auth/student/signup", users.student_signup);
app.post("/auth/recruiter/signup", users.recruiter_signup);

app.post("/auth/recruiter/login", users.recruiter_login);
app.post("/auth/student/login", users.student_login);
app.post("/auth/coordinator/login", users.coordinator_login);


// calling the functions: view_recuriter_profile
app.get("/recruiter/view_recuriter_profile/:id", (req, res) => {
  console.log("<<<<", auths.verifyRecruiter);
  queries
    .view_recuriter_profile(req.params.id)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});


// app.get("/coordinator/view_recuriter_profile/:id", auth.verifyCoordinator,)


// calling the functions: view_student_profile
app.get("/view_student_profile/:id", (req, res) => {
  console.log(req.params.id);
  queries
    .view_student_profile(req.params.id)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// calling the functions: view_coordinator_profile
app.get("/view_coordinator_profile/:id", (req, res) => {
  console.log(req.params.id);
  queries
    .view_coordinator_profile(req.params.id)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// calling the functions: view_applicants
app.get("/view_applicants/:jid/:rid", (req, res) => {
  queries
    .view_applicants(req.params.jid, req.params.rid)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// calling the functions: view_applicants
app.get("/view_company/:cid", (req, res) => {
  queries
    .view_company_profile(req.params.cid)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// calling the functions: view_applicants
app.get("/view_company_coordinator/:cid", (req, res) => {
  queries
    .view_company_coordinator(req.params.cid)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// calling the functions: view_applicants
app.get("/view_company_recruiter/:cid", (req, res) => {
  queries
    .view_company_recruiter(req.params.cid)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/view_jaf/:jid/:cid/:role", (req, res) => {
  	queries.view_jaf(req.params.jid,req.params.cid, req.params.role)
  	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/sign_jaf", (req, res) => {
	queries.sign_jaf(req.body.jaf_id, req.body.company_id, req.body.rno, req.body.resume_id, req.body.role).then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/view_student_list", (req, res) => {
	queries.view_student_list()
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/add_slot", (req, res) => {
	queries.add_slot(req.body.jaf_id, req.body.slot)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/close_jaf", (req, res) => {
	queries.close_jaf(req.body.jaf_id, req.body.close_time)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/open_jaf", (req, res) => {
	queries.open_jaf(req.body.jaf_id, req.body.open_time)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/assign_company", (req, res) => {
	queries.assign_company(req.body.recruiter_id, req.body.company_id)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/create_company", (req, res) => {
	queries.create_company(req.body.name, req.body.origin, req.body.coordinator_id)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/add_eligibility", (req, res) => {
	console.log("Herrrrrrrrrrrrrrrrrrr");
	console.log(req.body.dep_ids);
	console.log(req.body.program_ids);
	queries.add_eligibility(req.body.jaf_id, req.body.dep_ids, req.body.program_ids)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/create_jaf", (req, res) => {
	queries.create_jaf(req.body)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/create_offers", (req, res) => {
	queries.create_offers(req.body.jaf_id, req.body.student_ids)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/create_shortlist", (req, res) => {
	queries.create_shortlist(req.body.jaf_id, req.body.student_ids)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/view_offers", (req, res) => {
	queries.view_offers(req.body.student_id)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/view_shortlists", (req, res) => {
	queries.view_shortlistss(req.body.student_id)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/upload_resume", (req, res) => {
	queries.student_upload_resume(req.body.student_id, req.body.resume_id, req.body.resume_url)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/view_resume", (req, res) => {
	queries.student_view_resume(req.body.student_id, req.body.resume_id)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/edit_student_profile", (req,res) => {
  console.log("eweeeeeeeeeeeeeeeeeee", req);
	queries.edit_student_profile(req.body.student_rno, req.body.student_name, req.body.student_gender, req.body.student_contact)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/edit_recruiter_profile", (req,res) => {
  console.log("eweeeeeeeeeeeeeeeeeee", req);
	queries.edit_recrutier_profile(req.body.recruiter_id, req.body.recruiter_name, req.body.recruiter_email, req.body.recruiter_contact)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/edit_coordinator_profile", (req,res) => {
  console.log("eweeeeeeeeeeeeeeeeeee", req);
	queries.edit_coordinator_profile(req.body.coordinator_id, req.body.coordinator_name, req.body.coordinator_email, req.body.coordinator_contact)
	.then((response)=>{
  		console.log(response);
  		res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/student/open_jafs", (req, res) => {
	queries.list_open_jafs().then((response) => {
		console.log(response);
		res.status(200).send(response);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});

app.get("/student/eligible_jafs", (req, res) => {
	queries.list_eligible_jafs(req.body.rno).then((response) => {
		console.log(response);
		res.status(200).send(response);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});

app.get("/student/applied_jafs", (req, res) => {
	queries.list_applied_jafs(req.body.rno).then((response) => {
		console.log(response);
		res.status(200).send(response);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});


app.get("/:did/dept_placed_students", (req, res) => {
	queries.placed_students_for_depID(req.params.did).then((response) => {
		console.log(response);
		res.status(200).send(response);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});

app.get("/:did/dept_unplaced_students", (req, res) => {
	queries.unplaced_students_for_depID(req.params.did).then((response) => {
		console.log(response);
		res.status(200).send(response);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});

app.get("/:did/view_department", (req, res) => {
	queries.view_department(req.params.did).then((response) => {
		console.log(response);
		res.status(200).send(response);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});

app.get("/:pid/prog_placed_students", (req, res) => {
	queries.placed_students_for_progID(req.params.pid).then((response) => {
		console.log(response);
		res.status(200).send(response);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});

app.get("/:pid/prog_unplaced_students", (req, res) => {
	queries.unplaced_students_for_programID(req.params.pid).then((response) => {
		console.log(response);
		res.status(200).send(response);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});

app.get("/:pid/view_program", (req, res) => {
	queries.view_program(req.params.pid).then((response) => {
		console.log(response);
		res.status(200).send(response);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});

app.get("/view_all_recuriters/:rid", (req, res) => {
	queries.view_all_recuriters(req.params.rid).then((response) => {
		console.log(response);
		res.status(200).send(response);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});

app.get("/view_created_jafs/:rid", (req, res) => {
  console.log("beginssss");
  queries.list_created_jafs(req.params.rid).then((response) => {
    console.log(response);
    res.status(200).send(response);
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});