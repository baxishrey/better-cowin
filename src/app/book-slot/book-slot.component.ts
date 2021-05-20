import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Center } from '../models/Center';
import { CowinService } from '../services/cowin.service';
import { DateService, DateValues } from '../services/date.service';

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.scss'],
})
export class BookSlotComponent implements OnInit {
  dateValues: DateValues[] = [];
  displayedColumns: string[] = ['hospital'];
  centers!: Observable<Center[]>;
  dummyData: Center[] = [
    {
      center_id: 558678,
      name: 'Bowring Hospital C1',
      address: 'Lady Curzon Rd Shivaji Nagar',
      state_name: 'Karnataka',
      district_name: 'BBMP',
      block_name: 'East',
      pincode: 560051,
      lat: 12,
      long: 0,
      from: '09:00:00',
      to: '17:00:00',
      fee_type: 'Free',
      sessions: [
        {
          session_id: '47f572f5-a8cc-4bb3-b1d8-1a4eed54153c',
          date: '17-05-2021',
          available_capacity: 0,
          min_age_limit: 45,
          vaccine: 'COVAXIN',
          slots: [
            '09:00AM-11:00AM',
            '11:00AM-01:00PM',
            '01:00PM-03:00PM',
            '03:00PM-05:00PM',
          ],
          available_capacity_dose1: 0,
          available_capacity_dose2: 0,
        },
      ],
    },
    {
      center_id: 563937,
      name: 'APOLLO MEDICAL CENTER P3',
      address:
        'Shriram Samruddhi Apartments Varthur Road Near Kundalahalli Signal Whitefield BEML Layout Brookefield',
      state_name: 'Karnataka',
      district_name: 'BBMP',
      block_name: 'Mahadevapura',
      pincode: 560066,
      lat: 12,
      long: 77,
      from: '09:00:00',
      to: '18:00:00',
      fee_type: 'Paid',
      sessions: [
        {
          session_id: '1315ec53-3290-4dd8-a3ea-b98d20462a9f',
          date: '17-05-2021',
          available_capacity: 20,
          min_age_limit: 45,
          vaccine: 'COVISHIELD',
          slots: [
            '09:00AM-11:00AM',
            '11:00AM-01:00PM',
            '01:00PM-03:00PM',
            '03:00PM-06:00PM',
          ],
          available_capacity_dose1: 0,
          available_capacity_dose2: 20,
        },
      ],
      vaccine_fees: [
        {
          vaccine: 'COVISHIELD',
          fee: '850',
        },
      ],
    },
  ];

  constructor(
    private dateService: DateService,
    private cowinService: CowinService
  ) {}

  ngOnInit(): void {
    this.centers = this.cowinService.getSlots();
    this.dateValues = this.dateService.getAllDatesOfWeekFromToday();
    this.displayedColumns = [
      ...this.displayedColumns,
      ...this.dateValues.map((dv) => dv.date),
    ];
  }
}
