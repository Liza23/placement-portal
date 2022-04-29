import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJafComponent } from './edit-jaf.component';

describe('EditJafComponent', () => {
  let component: EditJafComponent;
  let fixture: ComponentFixture<EditJafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
