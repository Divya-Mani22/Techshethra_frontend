import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'; // Inject & PLATFORM_ID add panniyachu
import { isPlatformBrowser } from '@angular/common'; // Browser check-kaga
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrationService } from '../../services/registeration.service';
import { Registration } from '../../models/registration.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  teamName = '';
  leaderName = '';
  leaderEmail = '';
  leaderPhone = '';
  member2 = '';
  member3 = '';
  member4 = '';
  paymentMode = '';
  transactionId = '';
  paymentStatus = 'PENDING';

  // --- Timer Variables ---
  private deadline = new Date('2026-03-01T23:59:59').getTime();
  public timeLeft: any = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private timerSubscription!: Subscription;
  public isRegistrationClosed = false;

  constructor(
    private regService: RegistrationService,
    @Inject(PLATFORM_ID) private platformId: Object // Platform ID inject panniyachu
  ) {}

  ngOnInit() {
    // 💡 Timer-a Browser-la mattum thaan start pannanum (SSR Timeout avoid panna)
    if (isPlatformBrowser(this.platformId)) {
      this.timerSubscription = interval(1000).subscribe(() => {
        this.calculateTime();
      });
    }
  }

  private calculateTime() {
    const now = new Date().getTime();
    const diff = this.deadline - now;

    if (diff <= 0) {
      this.isRegistrationClosed = true;
      if (this.timerSubscription) this.timerSubscription.unsubscribe();
      return;
    }

    this.timeLeft.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.timeLeft.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.timeLeft.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    this.timeLeft.seconds = Math.floor((diff % (1000 * 60)) / 1000);
  }

  submitForm() {
    if (this.isRegistrationClosed) {
      alert('Sorry! Registration has been closed officially.');
      return;
    }

    const data = {
      teamName: this.teamName,
      leaderName: this.leaderName,
      leaderEmail: this.leaderEmail,
      leaderPhone: this.leaderPhone,
      member2: this.member2,
      member3: this.member3,
      member4: this.member4,
      paymentMode: this.paymentMode,
      transactionId: this.transactionId,
      paymentStatus: 'PENDING'
    };

    this.regService.register(data).subscribe({
      next: (res: Registration) => {
        console.log(res);
        alert('Registration successful 🎉');
        this.resetForm();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        alert(err.error || 'Registration failed ❌');
      }
    });
  }

  resetForm() {
    this.teamName = ''; this.leaderName = ''; this.leaderEmail = '';
    this.leaderPhone = ''; this.member2 = ''; this.member3 = '';
    this.member4 = ''; this.paymentMode = ''; this.transactionId = '';
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
