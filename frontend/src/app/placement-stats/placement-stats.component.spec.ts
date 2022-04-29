import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementStatsComponent } from './placement-stats.component';

describe('PlacementStatsComponent', () => {
  let component: PlacementStatsComponent;
  let fixture: ComponentFixture<PlacementStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
