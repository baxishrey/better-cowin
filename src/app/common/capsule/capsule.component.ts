import { Component, Input, OnInit } from '@angular/core';
import { CapsuleType } from '../../models/CapsuleType';

@Component({
  selector: 'app-capsule',
  templateUrl: './capsule.component.html',
  styleUrls: ['./capsule.component.scss'],
})
export class CapsuleComponent implements OnInit {
  @Input()
  capsuleType!: CapsuleType;

  @Input()
  count!: number;

  constructor() {}

  ngOnInit(): void {
    console.log(`Type: ${this.capsuleType}`);
  }

  getCapsuleClass(): { [key: string]: boolean } {
    return {
      paid: this.capsuleType == 'Paid',
      na: this.capsuleType == 'na',
      booked: this.capsuleType == 'booked',
      count: this.capsuleType == 'count',
      status: this.capsuleType != 'Paid' && this.capsuleType != 'Free',
    };
  }
}
