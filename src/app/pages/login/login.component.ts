import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loadingProvider: 'google' | 'apple' | 'email' | null = null;
  mode: 'signin' | 'signup' = 'signin';
  name = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  toggleMode(nextMode: 'signin' | 'signup') {
    this.mode = nextMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  async submitEmailForm() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.mode === 'signup' && !this.name.trim()) {
      this.errorMessage = 'Please enter your name to create an account.';
      return;
    }

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please fill in both email and password.';
      return;
    }

    this.loadingProvider = 'email';

    try {
      if (this.mode === 'signup') {
        await this.auth.signUpWithEmail(this.name, this.email, this.password);
        this.successMessage = 'Account created successfully.';
      } else {
        await this.auth.signInWithEmail(this.email, this.password);
        this.successMessage = 'Signed in successfully.';
      }

      this.router.navigate(['/']);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      this.errorMessage = message;
    } finally {
      this.loadingProvider = null;
    }
  }

  async loginGoogle() {
    this.loadingProvider = 'google';
    this.errorMessage = '';
    this.successMessage = '';
    try {
      await this.auth.signInWithGoogle();
      this.router.navigate(['/']);
    } finally {
      this.loadingProvider = null;
    }
  }

  async loginApple() {
    this.loadingProvider = 'apple';
    this.errorMessage = '';
    this.successMessage = '';
    try {
      await this.auth.signInWithApple();
      this.router.navigate(['/']);
    } finally {
      this.loadingProvider = null;
    }
  }
}
