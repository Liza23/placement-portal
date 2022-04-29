import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignJafComponent } from './sign-jaf.component';

describe('SignJafComponent', () => {
  let component: SignJafComponent;
  let fixture: ComponentFixture<SignJafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignJafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignJafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
