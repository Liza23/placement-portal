import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorHomeComponent } from './coordinator-home/coordinator-home.component';
import { CoordinatorInfoComponent } from './coordinator-info/coordinator-info.component';
import { CoordinatorFirmComponent } from './coordinator-firm/coordinator-firm.component';
import { RecruiterHomeComponent } from './recruiter-home/recruiter-home.component';
import { RecruiterInfoComponent } from './recruiter-info/recruiter-info.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ViewJafComponent } from './view-jaf/view-jaf.component';
import { DepartmentComponent } from './department/department.component';
import { ProgramComponent } from './program/program.component';

const routes: Routes = [
  {path: 'students', component: ListStudentsComponent},
  {path: 'coordinators/:coordinator_id/home', component: CoordinatorHomeComponent},
  {path: 'coordinators/:coordinator_id/edit-details', component: CoordinatorInfoComponent},
  {path: 'firms/:firm_id', component: CoordinatorFirmComponent},
  {path: 'depts/:department_id', component: DepartmentComponent},
  {path: 'progs/:program_id', component: ProgramComponent},
  {path: 'jafs/:jaf_id/view', component: ViewJafComponent},
  {path: 'recruiters/:recruiter_id/home', component: RecruiterHomeComponent},
  {path: 'recruiters/:recruiter_id/edit-details', component: RecruiterInfoComponent},
  // {path: '**', redirectTo: 'students', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
