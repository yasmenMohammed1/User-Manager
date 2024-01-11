import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
// import {} from '@angular/material/t'
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    NgOptimizedImage,
    FlexLayoutModule,
    FlexLayoutServerModule,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
