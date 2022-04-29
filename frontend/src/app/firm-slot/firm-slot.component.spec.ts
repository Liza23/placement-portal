import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmSlotComponent } from './firm-slot.component';

describe('FirmSlotComponent', () => {
  let component: FirmSlotComponent;
  let fixture: ComponentFixture<FirmSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
