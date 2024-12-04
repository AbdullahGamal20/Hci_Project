import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCourseMaterialsComponent } from './access-course-materials.component';

describe('AccessCourseMaterialsComponent', () => {
  let component: AccessCourseMaterialsComponent;
  let fixture: ComponentFixture<AccessCourseMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessCourseMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessCourseMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
