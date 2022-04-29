import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJafComponent } from './view-jaf.component';

describe('ViewJafComponent', () => {
  let component: ViewJafComponent;
  let fixture: ComponentFixture<ViewJafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
