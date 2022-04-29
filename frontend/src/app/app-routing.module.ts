import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorHomeComponent } from './coordinator-home/coordinator-home.component';
import { CoordinatorInfoComponent } from './coordinator-info/coordinator-info.component';
import { CoordinatorFirmComponent } from './coordinator-firm/coordinator-firm.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ViewJafComponent } from './view-jaf/view-jaf.component';
import { DeptStudentStatsComponent } from './dept-student-stats/dept-student-stats.component';
import { UsersComponent } from './users/users.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: UsersComponent},
  {path: 'students', component: ListStudentsComponent},
  {path: 'coordinators/:coordinator_id/home', component: CoordinatorHomeComponent},
  {path: 'coordinators/:coordinator_id/edit-details', component: CoordinatorInfoComponent},
  {path: 'coordinators/:coordinator_id/firms/:firm_id', component: CoordinatorFirmComponent},
  {path: 'jafs/:jaf_id', component: ViewJafComponent},
  {path: 'stats', component: DeptStudentStatsComponent},
  {path: '**', redirectTo: 'students', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
