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
import { CourseManagementComponent } from './components/course-management/course-management.component';
import { TrackProgressComponent } from './components/track-progress/track-progress.component';
import { SubmitAssignmentComponent } from './components/submit-assignment/submit-assignment.component';

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

    children: [
      { path: 'submit-assignment', component: SubmitAssignmentComponent }, // not done
      { path: 'access-materials', component: AccessCourseMaterialsComponent },
      { path: 'track-progress', component: TrackProgressComponent }, // // not done
      { path: 'grade-assessment', component: GradeAssessmentComponent },
      { path: 'course-creation', component: CourseCreationComponent },
      { path: 'monitor-progress', component: MonitoringProgressComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'course-management', component: CourseManagementComponent }, // not done
      { path: 'course-enrollment', component: CourseEnrollmentComponent }, // not done

      // { path: '', component: LoginComponent, pathMatch: 'full' },
    ],
  },
  // Fallback route
  { path: '**', redirectTo: 'login' },
];
