import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RulesComponent } from './pages/rules/rules.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { PrizeComponent } from './pages/prize/prize.component'; // 👈 Intha import mukkiyam
import { authGuard } from './auth.guard'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'prize', component: PrizeComponent }, // 👈 Intha path-a ippo register panniyachu
  { path: 'register', component: RegisterComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [authGuard] 
  }
];