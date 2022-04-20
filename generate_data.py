# Author: Aditya Badola
# Aim: Generate dummy Master Data for Skynet Simulation | Generate data for Database Management Project
# Written On: 13-11-2021 11:00 PM IST
# Updated On: 20-04-2022 8:00 PM IST

from __future__ import print_function
import numpy as np
from openpyxl import load_workbook
from shutil import copy2, make_archive
import atexit, os
from os import path
from json import dumps, loads

import random, string


# COORDINATOR   
class Coordie:
    def __init__(self, id, pswd, name, mail, cntct):
        self.id = id
        self.pswd = pswd
        self.name = name
        self.mail = mail
        self.cntct = cntct
N = 20 # number of placement coordinators
X0 = [''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(16)) for i in range(N)]
X1 = ["Aditya Badola", "Advait Kumar", "Anurag Kr Gupta", "Baksheesh Sachar", "Jasleen Kaur", "Nikhil Parpay", "Pradeep Chudsama", "Ravindra Girase", "Sanjna Mohan", "Suyash Kadam", "Kunal Jain", "Tushar Dhingra", "Pushpendra Singh Jadoun", "Tarunsai Goddu", "Utkarsh Sahu", "Ayush Aditya", "Govind Rajhans Jadhav", "Pasunuri Prathiba", "Rajib Chatterjee", "Mohammed Riyaz"]
X2 = ["190050006@iitb.ac.in", "18D070003@iitb.ac.in", "203186001@iitb.ac.in", "21f468004@iitb.ac.in", "215280046@iitb.ac.in", "213100079@iitb.ac.in", "21370111@iitb.ac.in", "213020004@iitb.ac.in", "20305r006@iitb.ac.in", "190020118@iitb.ac.in", "kunaljain@iitb.ac.in", "190110099@iitb.ac.in", "190040082@iitb.ac.in", "190070024@iitb.ac.in", "180100120@iitb.ac.in", "21f468009@iitb.ac.in", "20307r004@iitb.ac.in", "203070024@iitb.ac.in", "20307r005@iitb.ac.in", "213110053@iitb.ac.in"]
X3 = ["8529295025", "9773817417", "9136824962", "9667640017", "9855591548", "8275233411", "9354816573", "8600154174", "9847051590", "9307135660", "7734006476", "7999004202", "8079046720", "6304713048", "6263905277", "7093195305", "8237566400", "6301832970", "7003035535", "9480216652"]
f = open("coordinators.csv", 'w')
for i in range(N):
    f.write(f"{i+1}, {X0[i]}, {X1[i]}, {X2[i]}, {X3[i]}\n")
f.close()


# PROGRAM
class Prog:
    def __init__(self, id, name, dur, lvl):
        self.id = id
        self.name = name
        self.dur = dur
        self.lvl = lvl
        
progs = [Prog(1, "B.Tech.", 4, "UG"),
         Prog(2, "Dual Degree", 5, "UG"),
         Prog(3, "B.S.", 4, "UG"),
         Prog(4, "B.Des.", 4, "UG"),
         Prog(5, "M.Sc.", 2, "PG"),
         Prog(6, "M.Tech. (TA)", 2, "PG"),
         Prog(7, "M.Tech. (RA)", 3, "PG"),
         Prog(8, "M.Des.", 2, "PG"),
         Prog(9, "M.Phil.", 2, "PG"),
         Prog(10, "MPP", 2, "PG"),
         Prog(11, "M.S. by Research", 2, "PG"),
         Prog(12, "Ph.D.", 6, "PhD")]
f = open("programs.csv", 'w')
for prog in progs:
    f.write(f"{prog.id}, {prog.name}, {prog.dur}, {prog.lvl}\n")
f.close()


# DEPARTMENT
class Dept:
    def __init__(self, name, code):
        self.name = name
        self.code = code

depts = [Dept("Aerospace Engineering", "AE"), 
         Dept("Biosciences and Bioengineering", "BM"),
         Dept("Chemical Engineering", "CH1"), 
         Dept("Chemistry", "CH2"), 
         Dept("Civil Engineering", "CE"), 
         Dept("Computer Science & Engineering", "CS"), 
         Dept("Earth Sciences", "ES"), 
         Dept("Electrical Engineering", "EE"), 
         Dept("Energy Science and Engineering", "EN"), 
         Dept("Environmental Science and Engineering", "EV"), 
         Dept("Humanities & Social Sciences", "HSS"), 
         Dept("Mathematics", "MA"), 
         Dept("Mechanical Engineering", "ME"), 
         Dept("Metallurgical Engineering & Materials Science", "MM"), 
         Dept("Physics", "PH"), 
         Dept("IDC School of Design", "IDC"), 
         Dept("Shailesh J. Mehta School of Management", "SJSOM"), 
         Dept("Geoinformatics & Natural Resources Engineering", "GNR"), 
         Dept("Industrial Engineering and Operations Research", "IO"), 
         Dept("Materials, Manufacturing and Modeling", "MMM"), 
         Dept("Systems & Control Engineering", "SC"), 
         Dept("Centre for Technology Alternatives for Rural Areas", "CTARA"), 
         Dept("Centre for Machine Intelligence and Data Science", "C-MInDS"), 
         Dept("Centre of Studies in Resources Engineering", "CSRE")]
depts.sort(key=lambda x: x.name)
f = open("departments.csv", 'w')
for dept in depts:
    f.write(f"{dept.code}, {dept.name}\n")
f.close()


# PROFILE


# def read_counter():
#     return loads(open("counter.json", "r").read()) + 1 if path.exists("counter.json") else 0

# def write_counter():
#     with open("counter.json", "w") as f:
#         f.write(dumps(counter))

# counter = read_counter()
# atexit.register(write_counter)

# def randPhNo():
#     ph_no = ""
#     ph_no += str(np.random.randint(7,10))
#     for i in range(1,10):
#         ph_no += str(np.random.randint(0,10))
#     return ph_no

# def randGender():
#     p = np.random.rand()
#     if p > 0.5:
#         return "M"
#     else:
#         return "F"

# F = ['1 StudentTemplate.xlsx', '2 APC Template.xlsx', '3 ComPOCTemplate.xlsx', '4 IRFTemplate.xlsx', '5 RoundTemplate.xlsx', '6 InterviewShortlistTemplate.xlsx', '9.CommonVolunteerMappingTemplate.xlsx']

# for i in range(len(F)):
#     copy2('/home/badola/APC/IIT Bombay Data Templates/' + F[i], F[i])

# N = 70        # total students
# C = 10          # total firms
# C_1 = 10
# C_2 = 0
# C_3 = C - C_1 - C_2
# numAPC = 20     # total APCs
# numPOC = 36     # total ComPOCs

# f1 = open("firstNameDataset.txt", 'r')
# f2 = open("lastNameDataset.txt", 'r')
# f3 = open("firmNameDataset.txt", 'r')

# C1 = []
# C2 = []
# C3 = []


# wb = load_workbook(filename='IPT Contacts 2021-22.xlsx')
# ws = wb['ICs']
# for i in range(2, 2+numPOC):
#     C1.append(ws.cell(row=i, column=1).value)
#     C2.append(ws.cell(row=i, column=7).value)
#     C3.append(ws.cell(row=i, column=4).value)
# wb.save('IPT Contacts 2021-22.xlsx')

# D1 = []
# D2 = []
# D3 = []

# for line in f1:
#     D1.append(line.strip().split()[0])

# for line in f2:
#     D2.append(line.strip().split()[0])

# for line in f3:
#     D3.append(line.strip())

# br = "--------------------------------------------------------------------"
# print(br)
# print("Number of total students: ", N)
# print("Number of firms: ", C)
# print(br)

# # Student Details
# firstName = np.random.choice(D1, N)
# lastName = np.random.choice(D2, N)
# email = []
# regNum = []
# contactNum = []
# gender = []
# for i in range(N):
#     regNum.append("iitb_" + str(i))
#     email.append(firstName[i].lower() + "." + lastName[i].lower() + "@iitb.ac.in")
#     contactNum.append(randPhNo())
#     gender.append(randGender())

# print("\nStarting to write in .xlsx files...\n\n")


# # 1 StudentTemplate

# wb = load_workbook(filename = F[0])
# ws = wb['Sheet1']
# for i in range(2, 2+N):
#     ws.cell(row=i, column=1).value = firstName[i-2] + " " + lastName[i-2]
#     ws.cell(row=i, column=2).value = email[i-2]
#     ws.cell(row=i, column=3).value = regNum[i-2]
#     ws.cell(row=i, column=4).value = contactNum[i-2]
#     ws.cell(row=i, column=5).value = gender[i-2]
# wb.save(F[0])


# # 2 APC Template

# wb = load_workbook(filename = F[1])
# ws = wb['Sheet1']
# ws.cell(row=i, column=1).value = C1[0]
# ws.cell(row=i, column=2).value = C2[0]
# ws.cell(row=i, column=3).value = C3[0]
# wb.save(F[1])


# # 3 ComPOCTemplate

# wb = load_workbook(filename = F[2])
# ws = wb['Sheet1']
# for i in range(2, 2+numPOC):
#     ws.cell(row=i, column=1).value = C1[i-2]
#     ws.cell(row=i, column=2).value = C2[i-2]
#     ws.cell(row=i, column=3).value = C3[i-2]
# wb.save(F[2])


# random.shuffle(C2)

# # 4 InterviewTemplate

# firmName = np.random.choice(D3, C, replace=False)
# roles1 = ["Consult", "BA", "Finance", "APM", "FMCG"]
# roles2 = ["DS", "Analytics", "Quant", "IT"]
# roles3 = ["Operations", "Core"]
# firmEmail = []
# jobRole = []
# pocEmail = []
# numPanels = []
# numRounds = []
# J = 0
# for i in range(C_1):
#     firmEmail.append(firmName[i].strip().split()[0].lower() + "@gmail.com")
#     jobRole.append(roles1[np.random.randint(0,5)])
#     pocEmail.append(C2[i+J])
#     # pocEmail.append(C2[np.random.randint(0,numAPC)])
#     # numPanels.append(3)
#     numPanels.append(np.random.randint(3,4))
#     numRounds.append(np.random.randint(2,4))
# J += C_1
# for i in range(C_2):
#     firmEmail.append(firmName[i].strip().split()[0].lower() + "@gmail.com")
#     jobRole.append(roles2[np.random.randint(0,4)])
#     pocEmail.append(C2[i+J])
#     # pocEmail.append(C2[np.random.randint(0,numAPC)])
#     # numPanels.append(3)
#     numPanels.append(np.random.randint(3,4))
#     numRounds.append(np.random.randint(2,4))
# J += C_2
# for i in range(C_3):
#     firmEmail.append(firmName[i].strip().split()[0].lower() + "@gmail.com")
#     jobRole.append(roles3[np.random.randint(0,2)])
#     pocEmail.append(C2[i+J])
#     # pocEmail.append(C2[np.random.randint(0,numAPC)])
#     # numPanels.append(3)
#     numPanels.append(np.random.randint(3,4))
#     numRounds.append(np.random.randint(2,4))

# wb = load_workbook(filename = F[3])
# ws = wb['Sheet1']
# for i in range(2, 2+C):
#     ws.cell(row=i, column=1).value = firmName[i-2]
#     ws.cell(row=i, column=2).value = firmEmail[i-2]
#     ws.cell(row=i, column=3).value = jobRole[i-2]
#     ws.cell(row=i, column=4).value = pocEmail[(i-2)]
#     ws.cell(row=i, column=5).value = X2[(i-2)%20]
#     ws.cell(row=i, column=6).value = numPanels[i-2]
#     ws.cell(row=i, column=7).value = "2021-11-30"
#     # ws.cell(row=i, column=8).value = "01:30:00"
#     k = i-2
#     if 0 <= k and k < C_1:
#         ws.cell(row=i, column=9).value = np.random.choice([10])
#         ws.cell(row=i, column=8).value = "16:45:00"
#     elif k < (C_1 + C_2):
#         ws.cell(row=i, column=9).value = np.random.choice([10])
#         ws.cell(row=i, column=8).value = "01:50:00"
#     else:
#         ws.cell(row=i, column=9).value = np.random.choice([10])
#         ws.cell(row=i, column=8).value = "02:10:00"
#     tmp = "PI Round 1"
#     for j in range(numRounds[i-2]):
#         tmp += ","
#         tmp += "PI Round " + str(j+2)
#     ws.cell(row=i, column=10).value = tmp
#     # ws.cell(row=i, column=13).value = "PI Round 1"
#     # ws.cell(row=i, column=14).value = "0"
# wb.save(F[3])


# # 5 RoundTemplate

# wb = load_workbook(filename = F[4])
# ws = wb['Sheet1']
# curr_row = 2
# for i in range(2, 2+C):
#     # p = 3
#     p = np.random.randint(2,5)
#     for j in range(numRounds[i-2]):
#         ws.cell(row=curr_row, column=1).value = firmName[i-2] + "(" + jobRole[i-2] + ")"
#         ws.cell(row=curr_row, column=2).value = str(j+1)
#         ws.cell(row=curr_row, column=3).value = "PI Round " + str(j+1)
#         ws.cell(row=curr_row, column=4).value = "0"
#         curr_row += 1
# wb.save(F[4])


# # 6 InterviewShortlistTemplate

# J = 0

# numShortlists = []
# for i in range(C):
#     # numShortlists.append(12)
#     if 0 <= i and i < C_1:
#         numShortlists.append(np.random.randint(7,20))
#     elif i < (C_1 + C_2):
#         numShortlists.append(np.random.randint(6,10))
#     else:
#         numShortlists.append(np.random.randint(7,10))

# commonStudents = []
# for i in range(C-1):
#     mini = min(numShortlists[i], numShortlists[i+1])
#     if 0 <= i and i < (C_1-1):
#         commonStudents.append(int(0.8*mini))
#     elif i < C_1:
#         commonStudents.append(int(0.50*mini))
#     elif i < (C_1 + C_2-1):
#         commonStudents.append(int(0.70*mini))
#     elif i < (C_1 + C_2 + 1):
#         commonStudents.append(int(mini))
#     else:
#         commonStudents.append(int(0.80*mini))
#     # p = np.random.rand()
#     # if p > 0:
#     #     commonStudents.append(np.random.randint(0, 6))
#     # else:
#     #     commonStudents.append(0)

# wb = load_workbook(F[6])
# ws = wb['Sheet1']
# curr_row = 2
# for i in range(2, 2+C):
#     ws.cell(row=i, column=1).value = firmName[i-2]
#     ws.cell(row=i, column=2).value = pocEmail[i-2]
# wb.save(F[6])

# print("\n", br)
# print("Number of shorlists:", numShortlists)
# print("Total shortlist: ", np.sum(np.array(numShortlists)))
# print("Overlapping students:", commonStudents)
# print(br)

# finalShortlist = []
# wb = load_workbook(filename = F[5])
# ws = wb['Sheet1']
# # curr_row = 2
# sum = 0
# for i in range(C):
#     sum += numShortlists[i]
#     if i < (C-1):
#         sum -= commonStudents[i]
# allShortlist = np.random.choice(regNum, sum, replace=False)
# curr = 0
# for i in range(2, 2+C):
#     tmp = allShortlist[curr:(curr+numShortlists[i-2])]
#     curr += numShortlists[i-2]
#     if i <= C:
#         curr -= commonStudents[i-2]
#     finalShortlist.append(list(set(tmp)))

# # for i in range(C):
# #     allShortlist = np.random.choice(regNum, numShortlists[i], replace=False)
# #     if i > 0 and i < 10:
# #         possible = int(min(numShortlists[i]/2, numShortlists[i-1]/2))
# #         allShortlist[0:possible] = finalShortlist[-1][0:possible]
# #     allShortlist = list(set(allShortlist))
# #     numShortlists[i] = len(allShortlist)
# #     finalShortlist.append(allShortlist)

# for i in range(2, 2+C):
#     for j in range(numShortlists[i-2]):
#         ws.cell(row=curr_row, column=1).value = firmName[i-2] + "(" + jobRole[i-2] + ")"
#         ws.cell(row=curr_row, column=2).value = finalShortlist[i-2][j]
#         ws.cell(row=curr_row, column=3).value = "SHORTLIST"
#         ws.cell(row=curr_row, column=4).value = 1
#         ws.cell(row=curr_row, column=5).value = "PI Round 1"
#         curr_row += 1
# wb.save(F[5])

# print("\nSimulation completed.")

# os.mkdir('/home/badola/APC/t' + str(counter))
# for i in range(len(F)):
#     copy2(F[i], '/home/badola/APC/t' + str(counter) + '/' + F[i])
# make_archive('/home/badola/APC/t' + str(counter), 'zip', root_dir='/home/badola/APC/t' + str(counter))

# print("\nDataset {} generation completed.\n\n".format(counter))
