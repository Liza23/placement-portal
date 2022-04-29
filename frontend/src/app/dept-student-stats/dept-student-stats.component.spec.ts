import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptStudentStatsComponent } from './dept-student-stats.component';

describe('DeptStudentStatsComponent', () => {
  let component: DeptStudentStatsComponent;
  let fixture: ComponentFixture<DeptStudentStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptStudentStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptStudentStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
