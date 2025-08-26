// src/app/layout/components/main-layout/main-layout.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * MainLayout
 * - Estructura base tipo dashboard: sidebar + header + content.
 */
@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export default class MainLayout {}
