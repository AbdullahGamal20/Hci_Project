import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators'; // Import `filter`
import { MonitoringProgressComponent } from './components/monitoring-progress/monitoring-progress.component';
import { AccessCourseMaterialsComponent } from './components/access-course-materials/access-course-materials.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    SidebarComponent,
    SignupComponent,
    FormBuilderComponent,
    ReactiveFormsModule,
    RouterOutlet,
    MainLayoutComponent,
    MonitoringProgressComponent,
    AccessCourseMaterialsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected `styleUrls` syntax
})
export class AppComponent {}
