import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { CoordinatorHomeComponent } from './coordinator-home/coordinator-home.component';

import { MatListModule } from '@angular/material/list'; 
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoordinatorInfoComponent } from './coordinator-info/coordinator-info.component';
import { CoordinatorFirmComponent } from './coordinator-firm/coordinator-firm.component';
import { ViewJafComponent } from './view-jaf/view-jaf.component';
import { EditJafComponent } from './edit-jaf/edit-jaf.component';
import { RecruiterHomeComponent } from './recruiter-home/recruiter-home.component';
import { RecruiterInfoComponent } from './recruiter-info/recruiter-info.component';
import { DepartmentComponent } from './department/department.component';
import { ProgramComponent } from './program/program.component';

@NgModule({
  declarations: [
    AppComponent,
    ListStudentsComponent,
    CoordinatorHomeComponent,
    CoordinatorInfoComponent,
    CoordinatorFirmComponent,
    ViewJafComponent,
    EditJafComponent,
    RecruiterHomeComponent,
    RecruiterInfoComponent,
    DepartmentComponent,
    ProgramComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
