import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorFirmComponent } from './coordinator-firm.component';

describe('CoordinatorFirmComponent', () => {
  let component: CoordinatorFirmComponent;
  let fixture: ComponentFixture<CoordinatorFirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorFirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
