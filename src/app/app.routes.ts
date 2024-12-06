import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CourseEnrollmentComponent } from './components/course-enrollment/course-enrollment.component';
import { GradeAssessmentComponent } from './components/grade-assessment/grade-assessment.component';
import { CourseCreationComponent } from './components/course-creation/course-creation.component';
import { AccessCourseMaterialsComponent } from './components/access-course-materials/access-course-materials.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MonitoringProgressComponent } from './components/monitoring-progress/monitoring-progress.component';

export const routes: Routes = [
  // Public routes
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: SignupComponent,
  },

  // Protected routes
  {
    path: 'dashboard',
    // component: SidebarComponent,
    children: [
      { path: 'course-enrollment', component: CourseEnrollmentComponent },
      { path: 'grade-assessment', component: GradeAssessmentComponent },
      { path: 'course-creation', component: CourseCreationComponent },
      { path: 'access-materials', component: AccessCourseMaterialsComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'monitoring-progress', component: MonitoringProgressComponent },
      { path: 'course-catalog', component: MonitoringProgressComponent }, // Added
      { path: 'assignments', component: MonitoringProgressComponent }, // Added
      { path: 'reports', component: MonitoringProgressComponent }, // Added
      { path: 'analytics', component: MonitoringProgressComponent }, // Added

      { path: '', component: MonitoringProgressComponent, pathMatch: 'full' },

    ],
  },
  // Fallback route
  { path: '**', redirectTo: 'login' },
];
