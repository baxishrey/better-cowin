import { Component, Input, OnInit } from '@angular/core';
import { Center } from '../models/Center';
import { Session } from '../models/Session';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent implements OnInit {
  @Input()
  center!: Center;

  @Input()
  forDate!: string;

  todaySessions!: Session[];

  constructor() {}

  ngOnInit(): void {
    this.todaySessions = this.center.sessions.filter(
      (s) => s.date == this.forDate
    );
  }
}
