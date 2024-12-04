import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringProgressComponent } from './monitoring-progress.component';

describe('MonitoringProgressComponent', () => {
  let component: MonitoringProgressComponent;
  let fixture: ComponentFixture<MonitoringProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
