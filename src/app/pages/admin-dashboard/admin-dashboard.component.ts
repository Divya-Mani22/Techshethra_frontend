import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for search input
import { RegistrationService } from '../../services/registeration.service'; 

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // Added FormsModule here
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  registrations: any[] = [];
  searchTerm: string = ''; // Stores the search text
  totalCount: number = 0;   // Stores the total number of teams

  constructor(private regService: RegistrationService) {}

  ngOnInit() {
    this.loadData();
    this.loadCount();
  }

  loadData() {
    this.regService.getAllRegistrations().subscribe((data: any) => {
      this.registrations = data;
    });
  }

  // Fetches the total count from the backend
  loadCount() {
    this.regService.getRegistrationCount().subscribe((count: number) => {
      this.totalCount = count;
    });
  }

  // Filter logic: This updates the table in real-time as you type
  get filteredRegistrations() {
    if (!this.searchTerm) {
      return this.registrations;
    }
    const term = this.searchTerm.toLowerCase();
    return this.registrations.filter(reg => 
      reg.teamName.toLowerCase().includes(term) ||
      reg.leaderName.toLowerCase().includes(term) ||
      reg.transactionId.toLowerCase().includes(term)
    );
  }

  onStatusUpdate(id: number, event: any) {
    const newStatus = event.target.value;
    
    this.regService.updateStatus(id, newStatus).subscribe({
      next: () => {
        alert("Status updated permanently to: " + newStatus);
        this.loadData(); 
      },
      error: (err) => {
        console.error("Update failed", err);
        alert("Database update failed. Check backend connection.");
      }
    });
  }

  getStatusColor(status: string) {
    if (status === 'PAID') return 'lime';
    if (status === 'REJECTED') return 'red';
    return 'orange'; 
  }
}