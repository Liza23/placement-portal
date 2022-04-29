import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorHomeComponent } from './coordinator-home/coordinator-home.component';
import { CoordinatorInfoComponent } from './coordinator-info/coordinator-info.component';
import { CoordinatorFirmComponent } from './coordinator-firm/coordinator-firm.component';
import { RecruiterHomeComponent } from './recruiter-home/recruiter-home.component';
import { RecruiterInfoComponent } from './recruiter-info/recruiter-info.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ViewJafComponent } from './view-jaf/view-jaf.component';
import { DeptStudentStatsComponent } from './dept-student-stats/dept-student-stats.component';
import { UsersComponent } from './users/users.component';
import { SignupComponent } from './signup/signup.component';
import { EditJafComponent } from './edit-jaf/edit-jaf.component';
import { SignJafComponent } from './sign-jaf/sign-jaf.component';
import { DepartmentComponent } from './department/department.component';
import { ProgramComponent } from './program/program.component';
import { StudentComponent } from './student/student.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { ResumeUploadComponent } from './resume-upload/resume-upload.component';
import { FirmSlotComponent } from './firm-slot/firm-slot.component';

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: UsersComponent},
  {path: 'students', component: ListStudentsComponent},
  {path: 'students/:student_rno/home', component: StudentComponent},
  {path: 'students/:student_rno/edit-details', component: StudentInfoComponent},
  {path: 'students/:student_rno/upload-resume', component: ResumeUploadComponent},
  {path: 'coordinators/:coordinator_id/home', component: CoordinatorHomeComponent},
  {path: 'coordinators/:coordinator_id/edit-details', component: CoordinatorInfoComponent},
  {path: 'coordinators/:coordinator_id/firms/:firm_id', component: CoordinatorFirmComponent},
  {path: 'stats', component: DeptStudentStatsComponent},
  {path: 'firms/:firm_id', component: CoordinatorFirmComponent},
  {path: 'depts/:department_id', component: DepartmentComponent},
  {path: 'progs/:program_id', component: ProgramComponent},
  {path: 'jafs/:jaf_id/view', component: ViewJafComponent},
  {path: 'jafs/:jaf_id/edit', component: EditJafComponent},
  {path: 'students/:student_rno/jafs/:jaf_id/sign', component: SignJafComponent},
  {path: 'recruiters/:recruiter_id/home', component: RecruiterHomeComponent},
  {path: 'recruiters/:recruiter_id/edit-details', component: RecruiterInfoComponent},
  {path: 'coordinators/:coordinator_id/jafs/:jaf_id/slot', component: FirmSlotComponent},
  {path: '**', redirectTo: 'students', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
