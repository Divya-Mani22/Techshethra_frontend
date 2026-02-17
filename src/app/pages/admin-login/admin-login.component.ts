import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // 👈 Path check pannunga

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginData = { username: '', password: '' };
  errorMessage: string = '';

  constructor(
    private router: Router, 
    private authService: AuthService // 👈 Inga define pannanum
  ) {}

  onLogin() {
    if (this.loginData.username === 'admin' && this.loginData.password === 'techshethra2026') {
      localStorage.setItem('isAdmin', 'true');
      this.authService.updateLoginStatus(true); 
      window.location.href = '/admin-dashboard'; 
    } else {
      this.errorMessage = 'Invalid Username or Password!';
    }
  }
}