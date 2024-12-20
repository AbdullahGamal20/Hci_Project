// src/main.ts
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
bootstrapApplication(AppComponent, {
  providers: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgModule,
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, FormsModule, ReactiveFormsModule),
    provideAnimations(),
  ],
});
