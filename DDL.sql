-- drop the pre-exisitng tables
DROP TABLE IF EXISTS OFFER;
DROP TABLE IF EXISTS SHORTLIST;
DROP TABLE IF EXISTS APPLIES_FOR;
DROP TABLE IF EXISTS RESUME;
DROP TABLE IF EXISTS STUDENT;
DROP TABLE IF EXISTS ELIGIBLE;
DROP TABLE IF EXISTS JAF;
DROP TABLE IF EXISTS RECRUITER;
DROP TABLE IF EXISTS COMPANY;
DROP TABLE IF EXISTS PROFILE;
DROP TABLE IF EXISTS DEPARTMENT;
DROP TABLE IF EXISTS PROGRAM;
DROP TABLE IF EXISTS COORDINATOR;


-- creating all tables in the order we need
CREATE TABLE COORDINATOR (
    coordinator_id INT PRIMARY KEY,
    coordinator_password TEXT NOT NULL,
    coordinator_name VARCHAR(50) NOT NULL,
    coordinator_email VARCHAR(50) NOT NULL UNIQUE,
    coordinator_contact VARCHAR(12) NOT NULL
);

CREATE TABLE PROGRAM (
    program_id INT PRIMARY KEY,
    program_name TEXT NOT NULL,
    program_duration INT NOT NULL,
    program_level TEXT NOT NULL, 
    CHECK (program_level in ('UnderGrad', 'PostGrad', 'PhD'))
);

CREATE TABLE DEPARTMENT (
    department_id INT PRIMARY KEY,
    department_name TEXT NOT NULL
);

CREATE TABLE PROFILE (
    profile_id INT PRIMARY KEY,
    profile_name TEXT NOT NULL,
    profile_description TEXT NOT NULL
);

CREATE TABLE COMPANY (
    company_id INT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    company_origin TEXT NOT NULL,
    company_coordinator INT,
    CONSTRAINT c0 FOREIGN KEY (company_coordinator) REFERENCES COORDINATOR(coordinator_id) ON DELETE SET NULL
);

CREATE TABLE RECRUITER (
    recruiter_id INT PRIMARY KEY,
    recruiter_password TEXT NOT NULL,
    recruiter_name VARCHAR(50) NOT NULL,
    recruiter_contact VARCHAR(20) NOT NULL,
    recruiter_email VARCHAR(50) NOT NULL UNIQUE,
    recruiter_company INT,
    CONSTRAINT c1 FOREIGN KEY (recruiter_company) REFERENCES COMPANY(company_id) ON DELETE SET NULL
);

CREATE TABLE JAF (
    jaf_id INT PRIMARY KEY,
    profile_id INT NOT NULL,
    company_id INT NOT NULL,
    jaf_jd TEXT NULL,
    jaf_bond_duration INT NOT NULL,
    jaf_location_of_posting TEXT NOT NULL,
    jaf_currency VARCHAR(10) NOT NULL, CHECK (jaf_currency in ('INR', 'USD', 'HKD', 'JPY', 'KRW')),
    jaf_ctc INT NOT NULL,
    jaf_gross INT NOT NULL,
    jaf_cpi REAL NOT NULL CHECK (jaf_cpi BETWEEN 0 AND 10),
    jaf_bonus_allowed BOOLEAN NOT NULL,
    jaf_opened_on TIMESTAMP,
    jaf_closed_on TIMESTAMP,
    jaf_slot REAL,
    CONSTRAINT c2 FOREIGN KEY (profile_id) REFERENCES PROFILE(profile_id) ON DELETE SET NULL,
    CONSTRAINT c3 FOREIGN KEY (company_id) REFERENCES COMPANY(company_id) ON DELETE SET NULL
);

CREATE TABLE ELIGIBLE (
    jaf_id INT NOT NULL,
    department_id INT NOT NULL,
    program_id INT NOT NULL,
    CONSTRAINT c18 PRIMARY KEY (jaf_id, department_id, program_id),
    CONSTRAINT C19 FOREIGN KEY (jaf_id) REFERENCES JAF(jaf_id),
    CONSTRAINT c20 FOREIGN KEY (department_id) REFERENCES DEPARTMENT(department_id),
    CONSTRAINT c21 FOREIGN KEY (program_id) REFERENCES PROGRAM(program_id)
);

CREATE TABLE STUDENT (
    student_rno INT PRIMARY KEY,
    student_password TEXT NOT NULL,
    student_name VARCHAR(50) NOT NULL,
    student_gender TEXT, 
    CHECK (student_gender in ('M', 'F', 'Other')),
    student_dob DATE,
    student_email VARCHAR(50) NOT NULL UNIQUE,
    student_contact VARCHAR(12),
    year_of_enrollment INT,
    student_current_year INT,
    student_cpi REAL CHECK (student_cpi BETWEEN 0 AND 10),
    student_incentive_points INT,
    program_id INT,
    department_id INT,
    allocated_jaf INT,
    allocation_timestamp TIMESTAMP,
    CONSTRAINT c4 FOREIGN KEY (allocated_jaf) REFERENCES JAF(jaf_id) ON DELETE SET NULL,
    CONSTRAINT c5 FOREIGN KEY (program_id) REFERENCES PROGRAM(program_id) ON DELETE SET NULL,
    CONSTRAINT c6 FOREIGN KEY (department_id) REFERENCES DEPARTMENT(department_id) ON DELETE SET NULL
);

CREATE TABLE RESUME (
    resume_id INT PRIMARY KEY,
    resume_url TEXT NOT NULL,
    resume_npages INT NOT NULL,
    student_rno INT NOT NULL,
    CONSTRAINT c7 FOREIGN KEY (student_rno) REFERENCES STUDENT(student_rno) ON DELETE SET NULL
);

CREATE TABLE APPLIES_FOR (
    student_rno INT NOT NULL,
    jaf_id INT NOT NULL,
    resume_id INT NOT NULL,
    date_time TIMESTAMP NOT NULL,
    CONSTRAINT c8 PRIMARY KEY (student_rno, jaf_id, resume_id),
    CONSTRAINT c9 FOREIGN KEY (student_rno) REFERENCES STUDENT(student_rno) ON DELETE SET NULL,
    CONSTRAINT c10 FOREIGN KEY (jaf_id) REFERENCES JAF(jaf_id) ON DELETE SET NULL,
    CONSTRAINT c11 FOREIGN KEY (resume_id) REFERENCES RESUME(resume_id) ON DELETE SET NULL
);

CREATE TABLE SHORTLIST (
    student_rno INT NOT NULL,
    jaf_id INT NOT NULL,
    date_time TIMESTAMP NOT NULL,
    CONSTRAINT c12 PRIMARY KEY (student_rno, jaf_id),
    CONSTRAINT c13 FOREIGN KEY (student_rno) REFERENCES STUDENT(student_rno) ON DELETE SET NULL,
    CONSTRAINT c14 FOREIGN KEY (jaf_id) REFERENCES JAF(jaf_id) ON DELETE SET NULL
);

CREATE TABLE OFFER (
    student_rno INT NOT NULL,
    jaf_id INT NOT NULL,
    date_time TIMESTAMP NOT NULL,
    CONSTRAINT c15 PRIMARY KEY (student_rno, jaf_id),
    CONSTRAINT c16 FOREIGN KEY (student_rno) REFERENCES STUDENT(student_rno) ON DELETE SET NULL,
    CONSTRAINT c17 FOREIGN KEY (jaf_id) REFERENCES JAF(jaf_id) ON DELETE SET NULL
);
