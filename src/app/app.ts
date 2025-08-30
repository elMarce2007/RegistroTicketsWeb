// src/app/app.component.ts
import { Component, signal } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class App {
  // No usamos esta señal, pero queda listo si quieres mostrar título global
  title = signal('RegistroTicketsWeb');
}
