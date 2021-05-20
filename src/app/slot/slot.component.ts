import { Component, Input, OnInit } from '@angular/core';
import { Session } from '../models/Session';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
})
export class SlotComponent implements OnInit {
  @Input()
  session!: Session;

  constructor() {}

  ngOnInit(): void {}
}
