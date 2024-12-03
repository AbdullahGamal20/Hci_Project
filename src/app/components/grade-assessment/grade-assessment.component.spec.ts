import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeAssessmentComponent } from './grade-assessment.component';

describe('GradeAssessmentComponent', () => {
  let component: GradeAssessmentComponent;
  let fixture: ComponentFixture<GradeAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeAssessmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
