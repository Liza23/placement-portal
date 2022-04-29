import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { CoordinatorHomeComponent } from './coordinator-home/coordinator-home.component';
import { MatTabsModule} from "@angular/material/tabs";
import { MatListModule } from '@angular/material/list'; 
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoordinatorInfoComponent } from './coordinator-info/coordinator-info.component';
import { CoordinatorFirmComponent } from './coordinator-firm/coordinator-firm.component';
import { ViewJafComponent } from './view-jaf/view-jaf.component';
import { EditJafComponent } from './edit-jaf/edit-jaf.component';
import { PlacementStatsComponent } from './placement-stats/placement-stats.component';
import { UsersComponent } from './users/users.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ListStudentsComponent,
    CoordinatorHomeComponent,
    CoordinatorInfoComponent,
    CoordinatorFirmComponent,
    ViewJafComponent,
    EditJafComponent,
    PlacementStatsComponent,
    UsersComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
