import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,  // Para formularios reactivos
    CommonModule          // Para *ngIf, *ngFor, etc.
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(readonly fb: FormBuilder, readonly authService: AuthService, readonly router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.signIn(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/tecnicos');
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'No se pudo iniciar sesión';
      }
    });
  }
}
