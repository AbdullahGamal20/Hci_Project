import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component'; // Import your layout component
import { CourseEnrollmentComponent } from './components/course-enrollment/course-enrollment.component';
import { GradeAssessmentComponent } from './components/grade-assessment/grade-assessment.component';
import { CourseCreationComponent } from './components/course-creation/course-creation.component';

export const routes: Routes = [
  // Public routes without sidebar
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: SignupComponent,
  },

  // Protected routes with sidebar
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'course-enrollment',
        component: CourseEnrollmentComponent,
      },
      {
        path: 'grade-assessment',
        component: GradeAssessmentComponent,
      },
      {
        path: 'course-creation',
        component: CourseCreationComponent,
      },
    ],
  },
];
