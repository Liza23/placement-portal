import numpy as np
import random, string
from datetime import datetime, timedelta

# GLOBAL VARIABLES ==============================
numStudents = 2000
students = []

# DEFINING CLASSES ==============================

# define a class for coordinators
class Coordie:
    def __init__(self, name, mail, cntct):
        self.name = name
        self.mail = mail
        self.cntct = cntct

# define a class for programs
class Prog:
    def __init__(self, id, name, dur, lvl):
        self.id = id
        self.name = name
        self.dur = dur
        self.lvl = lvl

# define a class for departments
class Dept:
    def __init__(self, name, code):
        self.name = name
        self.code = code

# define a class for profiles
class Profile:
    def __init__(self, name, descrip):
        self.name = name
        self.descrip = descrip

# define a class for countries
class Country:
    def __init__(self, name, cur, fact):
        self.name = name
        self.cur = cur
        self.fact = fact

# define a class for jaf
class JAF:
    def __init__(self, company_id, profile_id, title, jd, bond_dur, lop, curr, ctc, gross, cpi, bonus, d1, d2, slot):
        self.cid = company_id
        self.pid = profile_id
        self.title = title
        self.jd = jd
        self.bond_dur = bond_dur
        self.lop = lop
        self.curr = curr
        self.ctc = ctc
        self.gross = gross
        self.cpi = cpi
        self.bonus = bonus
        self.opened_on = d1
        self.closed_on = d2
        self.slot = slot

# define a class for students
class Student:
    def __init__(self, rno, pswd, name, gndr, dob, mail, cntct, yr_enrl, curr_yr, cpi, ip, dept_id, prog_id, allocJaf, allocTime):
        self.rno = rno
        self.pswd = pswd
        self.name = name
        self.gndr = gndr
        self.dob = dob
        self.mail = mail
        self.cntct = cntct
        self.yr_enrl = yr_enrl
        self.curr_yr = curr_yr
        self.cpi = cpi
        self.ip = ip
        self.dept_id = dept_id
        self.prog_id = prog_id
        self.allocJaf = allocJaf
        self.allocTime = allocTime


# UTILITY FUNCTIONS ==============================

def getGender():
    return random.choices(["M", "F", "Other"], weights=[48, 48, 4])[0]

def getDept():
    return random.randint(1, len(depts))

def getProg():
    return random.randint(1, len(progs))

def getStudCPI():
    return round(random.random()*4+6, 2)

def getIP():
    return random.randint(1,15)*2

def randPhNo():
    ph_no = ""
    ph_no += str(np.random.randint(7,10))
    for _ in range(1,10):
        ph_no += str(np.random.randint(0,10))
    return ph_no

firstNames = []
f1 = open("data/firstNameDataset.txt", 'r')
for line in f1:
    firstNames.append(line.strip().split()[0])
f1.close()

lastNames = []
f2 = open("data/lastNameDataset.txt", 'r')
for line in f2:
    lastNames.append(line.strip().split()[0])
f2.close()

def getBondDur():
    return random.choices([0,6,10,12,24], weights=[0.7, 0.075, 0.075, 0.075, 0.075])[0]

def getCpiCutoff():
    return random.choices([0.00,6.50,7.00,7.50,8.00,8.50], weights=(50,10,10,10,10,10))[0]

def getBonus():
    return random.choice([0,1])

start = datetime.strptime('01/10/2021 12:01 AM', '%m/%d/%Y %I:%M %p')
end = datetime.strptime('04/20/2021 11:59 PM', '%m/%d/%Y %I:%M %p')
delta = end - start
int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
def getJafTime():
    opened_on = start + timedelta(seconds=random.randint(1, int(int_delta/4)))
    closed_on = opened_on + timedelta(seconds=(round(abs(np.random.normal(36,12)*3600))))
    assert(closed_on > opened_on)
    r = np.random.random()
    if r < 0.55:
        if r < 0.55:    # 0.1
            return opened_on, closed_on
        else:
            return opened_on, "NULL"
    else:
        return "NULL", "NULL"

def getTime(start, end):
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    try:
        assert(int_delta > 0)
    except:
        print("\n\nwhat the hell!\n\n")
    return start + timedelta(seconds=random.randint(1, int(int_delta/2)))

def getDob(pid):
    if pid < 5:
        start_date = datetime.strptime('01/01/1999', '%m/%d/%Y')
        end_date = datetime.strptime('01/01/2002', '%m/%d/%Y')
    else:
        start_date = datetime.strptime('01/01/1993', '%m/%d/%Y')
        end_date = datetime.strptime('01/01/1998', '%m/%d/%Y')
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    return start_date + timedelta(days=random_number_of_days)

def getAllocJaf():
    r = np.random.random()
    if r < 0.1:
        return random.randint(1, numJafs), getJafTime()[0]
    else:
        return "NULL", "NULL"


# ENTITY 1 : COORDINATOR ==============================

coordies = [Coordie("Aditya Badola", "190050006@iitb.ac.in", "8529295025"),
            Coordie("Advait Kumar", "18D070003@iitb.ac.in", "9773817417"),
            Coordie("Anurag Kr Gupta", "203186001@iitb.ac.in", "9136824962"),
            Coordie("Ayush Aditya", "21f468009@iitb.ac.in", "7093195305"),
            Coordie("Baksheesh Sachar", "21f468004@iitb.ac.in", "9667640017"),
            Coordie("Govind Rajhans Jadhav", "20307r004@iitb.ac.in", "8237566400"),
            Coordie("Jasleen Kaur", "215280046@iitb.ac.in", "9855591548"),
            Coordie("Kunal Jain", "kunaljain@iitb.ac.in", "7734006476", ),
            Coordie("Mohammed Riyaz", "213110053@iitb.ac.in", "9480216652"),
            Coordie("Nikhil Parpay", "213100079@iitb.ac.in", "8275233411"),
            Coordie("Pasunuri Prathiba", "203070024@iitb.ac.in", "6301832970"),
            Coordie("Pradeep Chudsama", "21370111@iitb.ac.in", "9354816573"),
            Coordie("Pushpendra Singh Jadoun", "190040082@iitb.ac.in", "8079046720"),
            Coordie("Rajib Chatterjee", "20307r005@iitb.ac.in", "7003035535"),
            Coordie("Ravindra Girase", "213020004@iitb.ac.in", "8600154174"),
            Coordie("Sanjna Mohan", "20305r006@iitb.ac.in", "9847051590"),
            Coordie("Suyash Kadam", "190020118@iitb.ac.in", "9307135660"),
            Coordie("Tarunsai Goddu", "190070024@iitb.ac.in", "6304713048"),
            Coordie("Tushar Dhingra", "190110099@iitb.ac.in", "7999004202"),
            Coordie("Utkarsh Sahu", "180100120@iitb.ac.in", "6263905277")]
pswds = [''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(16)) for _ in range(len(coordies))]

# write the data of coordinators to a .csv file
f = open("data/coordinator.csv", 'w')
f.write("coordinator_id,coordinator_password,coordinator_name,coordinator_email,coordinator_contact\n")
for i in range(len(coordies)):
    f.write(f"{i+1},{pswds[i]},{coordies[i].name},{coordies[i].mail},{coordies[i].cntct}\n")
f.close()


# ENTITY 2 : PROGRAM ==============================
 
progs = [Prog(1, "B.Tech.", 4, "UnderGrad"),
         Prog(2, "Dual Degree", 5, "UnderGrad"),
         Prog(3, "B.S.", 4, "UnderGrad"),
         Prog(4, "B.Des.", 4, "UnderGrad"),
         Prog(5, "M.Sc.", 2, "PostGrad"),
         Prog(6, "M.Tech. (TA)", 2, "PostGrad"),
         Prog(7, "M.Tech. (RA)", 3, "PostGrad"),
         Prog(8, "M.Des.", 2, "PostGrad"),
         Prog(9, "M.Phil.", 2, "PostGrad"),
         Prog(10, "MPP", 2, "PostGrad"),
         Prog(11, "M.S. by Research", 2, "PostGrad"),
         Prog(12, "Ph.D.", 6, "PhD")]

# write the data of programs to a .csv file
f = open("data/program.csv", 'w')
f.write("program_id,program_name,program_duration,program_level\n")
for prog in progs:
    f.write(f"{prog.id},{prog.name},{prog.dur},{prog.lvl}\n")
f.close()


# ENTITY 3 : DEPARTMENT ==============================

depts = [Dept("Aerospace Engineering", "AE"), 
         Dept("Biosciences and Bioengineering", "BM"),
         Dept("Chemical Engineering", "CH1"), 
         Dept("Chemistry", "CH2"), 
         Dept("Civil Engineering", "CE"), 
         Dept("Computer Science and Engineering", "CS"), 
         Dept("Earth Sciences", "ES"), 
         Dept("Electrical Engineering", "EE"), 
         Dept("Energy Science and Engineering", "EN"), 
         Dept("Environmental Science and Engineering", "EV"), 
         Dept("Humanities and Social Sciences", "HSS"), 
         Dept("Mathematics", "MA"), 
         Dept("Mechanical Engineering", "ME"), 
         Dept("Metallurgical Engineering and Materials Science", "MM"), 
         Dept("Physics", "PH"), 
         Dept("IDC School of Design", "IDC"), 
         Dept("Shailesh J. Mehta School of Management", "SJSOM"), 
         Dept("Geoinformatics and Natural Resources Engineering", "GNR"), 
         Dept("Industrial Engineering and Operations Research", "IO"), 
         Dept("Materials Manufacturing and Modeling", "MMM"), 
         Dept("Systems and Control Engineering", "SC"), 
         Dept("Centre for Technology Alternatives for Rural Areas", "CTARA"), 
         Dept("Centre for Machine Intelligence and Data Science", "C-MInDS"), 
         Dept("Centre of Studies in Resources Engineering", "CSRE")]
depts.sort(key=lambda x: x.name)

# write the data of departments to a .csv file
f = open("data/department.csv", 'w')
f.write("department_id,department_name\n")
for i in range(len(depts)):
    f.write(f"{i+1},{depts[i].name}\n")
f.close()


# ENTITY 4 : PROFILE ==============================

profs = [Profile("Consultant", "Consulting covers an incredibly broad range of topics; organizations; clients; and industries. A consultant can work independently or as part of a consulting firm; specializing in any given field of expertise. Essentially; consultants are hired to share their expertise and knowledge to help businesses attain goals and solve problems. Sometimes; companies bring on consultants to perform day-to-day work and augment or supplement staff—and save the fixed overhead costs associated with a full-time employee. Other times; they’re brought on board for a specialized purpose: to troubleshoot; tackle a specific challenge; optimize something specific; spin off a successful business unit; revive a failing business; etc."),
         Profile("Business Analyst", "Business analysts play a key role in the success of so many organizations. Acting as communicators; facilitators; and mediators; these flexible professionals seek out the best ways to improve processes and increase effectiveness through technology; strategy; analytic solutions; and more. With organizational and project goals lighting the way; business analysts are meticulous in their documentation and evaluation of potential solutions—always working to bridge the gap among departments with improved technical efficiency and productivity."),
         Profile("Operations", "Operations managers oversee the organizational activities of businesses; government agencies; non-profit groups; and other organizations. These professionals are talented managers and leaders. They might support operational leadership in a variety of departments — from finance and IT to human resources and accounts payable. At both large and small organizations; operations managers supervise; hire; and train employees; manage quality assurance programs; strategize process improvements; and more. Operations managers are ultimately responsible for maintaining and increasing the efficiency of a business; agency; or organization."),
         Profile("Associate Product Manager", "Within many industries; product managers are responsible for guaranteeing the success of a specific product or product line. These extreme doers are product experts with a powerful capability to make strategic decisions based on market and competitor analyses. Prior to production; they create the roadmap to guide a product from conception through design and into wide release. Product managers bridge the gap among the different departments involved in successfully bringing your product(s) to market; including RandD; engineering; manufacturing; marketing; sales; and customer support. Their ultimate goal is the creation and launch of products that meet consumers' needs — growing market share and success."),
         Profile("Finance", "Financial analysts are fundamental contributors to the fiscal health and success of many types of organizations. From banks and pension and mutual funds; to securities firms and insurance companies; these highly adept people evaluate economic data and trends; determine financial status and value; and help guide investment decisions. Financial analysts — sometimes referred to as securities or investment analysts — often specialize in specific industries; products; or geographic regions. On both the buy-side and sell-side of the financial landscape; they may work as portfolio or fund managers; ratings analysts; risk analysts; and more."),
         Profile("Data Science/Analytics", "A data scientist/analyst knows how to extract meaning from and interpret data. This unique skill set requires the aid of statistical methods and machinery; but largely relies on analytical brain power. Because raw data can rarely be utilized reliably; businesses in a variety of industries look to these technical experts to collect; clean; and validate their data. This meticulous process requires persistence and software engineering skills—expertise that's integral to understanding data bias and to debug output from code. In simpler terms; data scientists find patterns and use the knowledge to build and improve."),
         Profile("Quantitative Trading", "Quantitative trading (also called quant trading) involves the use of computer algorithms and programs—based on simple or complex mathematical models—to identify and capitalize on available trading opportunities. Quant trading also involves research work on historical data with an aim to identify profit opportunities."),
         Profile("IT Software", "In our digital world; organizations have to stay connected at all costs. The role of information technology; or IT; is integral to implementing and maintaining the infrastructure and solutions that will continue to move the business forward. The IT department is there to assist as computer issues arise; software needs updating; or networks require fixing. In general; the IT department is responsible for implementing infrastructure automation; governing the use of network and operating systems; and optimizing functionality. At one point or another; he or she will typically save the day by recovering a crucial document—or preventing a systemwide cybersecurity breach; or keeping such a breach from spreading."),
         Profile("Core", "Department-wise core profile"),
         Profile("FMCG", "FMCG covers a range of sectors and job titles within retail. You could work as a Sales Assistant on the shop floor; boss people around in Management or work behind the scenes as a Buyer or Merchandiser. Each of these has very difficult responsibilities; but can all sell FMCG. Although daily duties are different for every role; essentially an FMCG role involves to fulfill and achieve distribution and sales objectives for key brands in the on-trade channel by successful implementation of sales strategies and plans. You need to ensure full compliance of sales; price management; promotion and merchandising."),
         Profile("Design", "Depending on the medium; a designer might use two-dimensional; three-dimensional; and/or graphic art to create visual concepts and products. Layout design; formatting; organization; and prioritization of materials; topics; images; and text are frequently part of their work; often; the resulting concepts or products aim to communicate a central message or theme. Designers work across a wide range of industries; disciplines; and roles; from in-house to agency or freelance design. They also work with an extensive variety of media; tools; techniques; and technologies.")]
idToProfile = dict()

# write the data of profiles to a .csv file
f = open("data/profile.csv", 'w')
f.write("profile_id,profile_name,profile_description\n")
for i in range(len(profs)):
    idToProfile[i+1] = profs[i].name
    f.write(f"{i+1},{profs[i].name},{profs[i].descrip}\n")
f.close()
profileToId = {v: k for k, v in idToProfile.items()}


# ENTITY 5 : COMPANY ==============================

# countries of origin
countries = [Country("India", "INR", 1),
             Country("United States", "USD", 75),
             Country("Japan", "JPY", 0.6),
             Country("Hong Kong", "HKD", 9.75),
             Country("South Korea", "KRW", 0.06)]

firmNames = []
f0 = open("data/firmNameDataset.txt", 'r')
for line in f0:
    firmNames.append(line.strip().replace(',', ' '))
f0.close()

firmToSlot = dict()
f1 = open("data/slots.csv", 'r')
r = 0
for line in f1:
    if r != 0:
        row = line.strip().split(',')
        firmToSlot[row[0]] = row[1]
    r += 1
f1.close()
for firm in firmNames:
    if firm not in firmToSlot:
        firmToSlot[firm] = "NULL"

numCompanies = len(firmNames)
idToFirm = dict()
firmToCO = dict()

# write the data of companies to a .csv file
f2 = open("data/company.csv", 'w')
f2.write("company_id,company_name,company_origin,company_coordinator\n")
for i in range(numCompanies):
    idToFirm[i+1] = firmNames[i]
    r = np.random.random()
    if r < 0.85:
        firmToCO[i+1] = 0
        f2.write(f"{i+1},{firmNames[i]},{countries[0].name},{i%20 + 1}\n")
    elif r < 0.9:
        firmToCO[i+1] = 1
        f2.write(f"{i+1},{firmNames[i]},{countries[1].name},{i%20 + 1}\n")
    elif r < 0.95:
        firmToCO[i+1] = 2
        f2.write(f"{i+1},{firmNames[i]},{countries[2].name},{i%20 + 1}\n")
    elif r < 0.975:
        firmToCO[i+1] = 3
        f2.write(f"{i+1},{firmNames[i]},{countries[3].name},{i%20 + 1}\n")
    else:
        firmToCO[i+1] = 4
        f2.write(f"{i+1},{firmNames[i]},{countries[4].name},{i%20 + 1}\n")
f2.close()
firmToId = {v: k for k, v in idToFirm.items()}


# ENTITY 6 : RECRUITER ==============================

numRecrtrs = int(numCompanies*1.05)
pswds = [''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(16)) for _ in range(numRecrtrs)]
rcrtrFirstName = np.random.choice(firstNames, numRecrtrs)
rcrtrLastName = np.random.choice(lastNames, numRecrtrs)
cntcts = [randPhNo() for _ in range(numRecrtrs)]

I = [i for i in range(numRecrtrs)]
random.shuffle(I)

f = open("data/recruiter.csv", 'w')
f.write("recruiter_id,recruiter_password,recruiter_name,recruiter_contact,recruiter_email,recruiter_company\n")
for i in range(numRecrtrs):
    f.write(f"{i+1},{pswds[i]},{rcrtrFirstName[i]} {rcrtrLastName[i]},{cntcts[i]},{rcrtrFirstName[i].lower()}.{rcrtrLastName[i].lower()}{np.random.randint(1,99)}@{firmNames[I[i]%numCompanies].lower().split()[0]}.com,{I[i]%numCompanies+1}\n")
f.close()


# ENTITY 7 : JAF ==============================

jafs = []
f1 = open("data/jobs.tsv", 'r')
f2 = open("data/jaf.csv", 'w')
f2.write("jaf_id,profile_id,company_id,jaf_jd,jaf_bond_duration,jaf_location_of_posting,jaf_currency,jaf_ctc,jaf_gross,jaf_cpi,jaf_bonus_allowed,jaf_opened_on,jaf_closed_on,jaf_slot\n")
r = 0
for line in f1:
    if r != 0:
        jaf = line.strip().split('\t')
        jaf[0] = jaf[0].replace(',', ' ')
        jaf[1] = jaf[1].replace(',', ' ')
        jaf[2] = jaf[2].replace(',', ' ')
        f3 = open(f"jds/jd{profileToId[jaf[2]]}.html", 'r')
        jd = f3.read()
        jd = jd.replace("Job Description", jaf[1])
        jd = jd.replace("[CompanyX]", jaf[0])
        jd = jd.replace("[job-description]", jaf[1].lower().replace(' ', '-'))
        jd = jd.replace("[companyX]", jaf[0].lower().split()[0])
        # jd = jd.replace(',', ';')
        f3.close()
        lop = countries[firmToCO[firmToId[jaf[0]]]].name
        cur = countries[firmToCO[firmToId[jaf[0]]]].cur
        fact = countries[firmToCO[firmToId[jaf[0]]]].fact
        ctc = 0
        gross = 0
        if profileToId[jaf[2]] == 7:
            ctc = round(np.random.normal(5500000, 1000000)/(fact*10000))*10000
            gross = round(random.choice([0.55,0.6,0.65,0.7])*ctc/10000)*10000
        elif profileToId[jaf[2]] == 6 or profileToId[jaf[2]] == 8:
            ctc = round(np.random.normal(3500000, 750000)/(fact*10000))*10000
            gross = round(random.choice([0.65,0.7,0.75,0.8])*ctc/10000)*10000
        else:
            ctc = round(np.random.normal(2500000, 400000)/(fact*10000))*10000
            gross = round(random.choice([0.8,0.85,0.9])*ctc/10000)*10000
        if lop == "India":
            lop = random.choice(["Gurugram", "Hyderabad", "Bangalore", "Kolkata", "Mumbai", "Chennai"])
        d1, d2 = getJafTime()
        jafs.append(JAF(firmToId[jaf[0]], profileToId[jaf[2]], jaf[1], jd, getBondDur(), lop, cur, ctc, gross, getCpiCutoff(), getBonus(), d1, d2, firmToSlot[jaf[0]]))
        # f2.write(f"{r}\t{jafs[-1].pid}\t{jafs[-1].cid}\t{jafs[-1].jd}\t{jafs[-1].bond_dur}\t{jafs[-1].lop}\t{jafs[-1].curr}\t{jafs[-1].ctc}\t{jafs[-1].gross}\t{jafs[-1].cpi}\t{jafs[-1].bonus}\t{jafs[-1].opened_on}\t{jafs[-1].closed_on}\t{jafs[-1].slot}\n")
        f2.write(f"{r},{jafs[-1].pid},{jafs[-1].cid},NULL,{jafs[-1].bond_dur},{jafs[-1].lop},{jafs[-1].curr},{jafs[-1].ctc},{jafs[-1].gross},{jafs[-1].cpi},{jafs[-1].bonus},{jafs[-1].opened_on},{jafs[-1].closed_on},{jafs[-1].slot}\n")
    r += 1
numJafs = r-1
f1.close()
f2.close()


# ENTITY 8 : STUDENT ==============================

pswds = [''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(16)) for _ in range(numStudents)]
stdntFirstName = np.random.choice(firstNames, numStudents)
stdntLastName = np.random.choice(lastNames, numStudents)
cntcts = [randPhNo() for _ in range(numStudents)]

for i in range(numStudents):
    pid = getProg()
    curr_yr = int(progs[pid-1].dur)
    yr_enrl = 23 - curr_yr
    # allocJaf, allocTime = getAllocJaf()
    students.append(Student(int(yr_enrl*1e7+i+1), pswds[i], stdntFirstName[i] + ' ' + stdntLastName[i], getGender(), getDob(pid), stdntFirstName[i].lower() + "." + stdntLastName[i].lower() + str(np.random.randint(1,99)) + "@iitb.ac.in", cntcts[i], 2000 + yr_enrl, curr_yr, getStudCPI(), getIP(), getDept(), pid, "NULL", "NULL"))


# ENTITY 9 : RESUME ==============================

studToResume = dict()
f = open("data/resume.csv", 'w')
f.write("resume_id,resume_url,resume_npages,student_rno\n")
sno = 0
for i in range(numStudents):
    nresumes = random.choice([1,2,3])
    for j in range(nresumes):
        f.write(f"{sno},https://drive.google.com/file/d/1-p1f8Sj4tK6Vq9DFOaFiFrQHLCzeA8r8/view?usp=sharing,{random.choice([1,2])},{students[i].rno}\n")
        if i not in studToResume:
            studToResume[i] = []
        studToResume[i].append(sno)
        sno += 1
f.close()


# ENTITY 10 : ELIGIBLE ==============================

deptToJaf = dict()
progToJaf = dict()
f = open("data/eligible.csv", 'w')
f.write("jaf_id,department_id,program_id\n")
for i in range(numJafs):
    for j in range(len(depts)):
        for k in range(len(progs)):
            r = random.random()
            if r > 0.4:
                f.write(f"{i+1},{j+1},{k+1}\n")
                if j not in deptToJaf:
                    deptToJaf[j] = []
                deptToJaf[j].append(i)
                if k not in progToJaf:
                    progToJaf[k] = []
                progToJaf[k].append(i)
f.close()


# ENTITY 11 : APPLIES_FOR ==============================

f1 = open("data/applies_for.csv", 'w')
f2 = open("data/shortlist.csv", 'w')
f3 = open("data/offer.csv", 'w')
f1.write("student_rno,jaf_id,resume_id,date_time\n")
f2.write("student_rno,jaf_id,date_time\n")
f3.write("student_rno,jaf_id,date_time\n")
for i in range(numStudents):
    for j in range(numJafs):
        if jafs[j].opened_on != "NULL" and j in deptToJaf[students[i].dept_id-1] and j in progToJaf[students[i].prog_id-1]:
            r = random.random()
            if r < 0.6:
                t1 = getTime(jafs[j].opened_on, jafs[j].closed_on)
                f1.write(f"{students[i].rno},{j+1},{random.choice(studToResume[i])},{t1}\n")
                if r < 0.0075:
                    t2 = getTime(jafs[j].closed_on, end)
                    f2.write(f"{students[i].rno},{j+1},{t2}\n")
                    if r < 0.0002:
                        t3 = getTime(t2, end)
                        if students[i].allocJaf == "NULL" or students[i].allocTime > t3:
                            f3.write(f"{students[i].rno},{j+1},{t3}\n")
                            if students[i].allocJaf == "NULL":
                                students[i].allocJaf = j+1
                                students[i].allocTime = getTime(t3, end)
f3.close()
f2.close()
f1.close()

# writing students' data
f = open("data/student.csv", 'w')
f.write("student_rno,student_password,student_name,student_gender,student_dob,student_email,student_contact,year_of_enrollment,student_current_year,student_cpi,student_incentive_points,department_id,program_id,allocated_jaf,allocation_timestamp\n")
for i in range(len(students)):
    f.write(f"{students[i].rno},{students[i].pswd},{students[i].name},{students[i].gndr},{students[i].dob},{students[i].mail},{students[i].cntct},{students[i].yr_enrl},{students[i].curr_yr},{students[i].cpi},{students[i].ip},{students[i].dept_id},{students[i].prog_id},NULL,NULL\n")
f.close()

# def read_counter():
#     return loads(open("counter.json", "r").read()) + 1 if path.exists("counter.json") else 0

# def write_counter():
#     with open("counter.json", "w") as f:
#         f.write(dumps(counter))

# counter = read_counter()
# atexit.register(write_counter)

# wb = load_workbook(filename = F[0])
# ws = wb['Sheet1']
# for i in range(2, 2+N):
#     ws.cell(row=i, column=1).value = firstName[i-2] + " " + lastName[i-2]
#     ws.cell(row=i, column=2).value = email[i-2]
#     ws.cell(row=i, column=3).value = regNum[i-2]
#     ws.cell(row=i, column=4).value = contactNum[i-2]
#     ws.cell(row=i, column=5).value = gender[i-2]
# wb.save(F[0])