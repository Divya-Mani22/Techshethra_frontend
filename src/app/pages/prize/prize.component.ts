import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prizes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.css']
})
export class PrizeComponent {
  // Prize list for the 200 members event
  prizeList = [
    { rank: 'Winner', title: 'Grand Prize', amount: '₹10,000', perk: 'Gold Trophy + Merit Certificate', color: 'gold' },
    { rank: 'Runner Up', title: 'Second Prize', amount: '₹5,000', perk: 'Silver Medal + Merit Certificate', color: 'silver' },
    { rank: 'Third Place', title: 'Third Prize', amount: '₹2,500', perk: 'Bronze Medal + Merit Certificate', color: 'bronze' }
  ];
}