import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { District } from '../models/District';
import { State } from '../models/State';
import { CowinService } from '../services/cowin.service';

@Component({
  selector: 'app-slot-search',
  templateUrl: './slot-search.component.html',
  styleUrls: ['./slot-search.component.scss'],
})
export class SlotSearchComponent implements OnInit {
  states$: Observable<State[]>;
  districts$: Observable<District[]>;
  selectedDistrict = 0;

  constructor(private cowinService: CowinService) {
    this.states$ = new Observable();
    this.districts$ = new Observable();
  }

  ngOnInit(): void {
    this.states$ = this.cowinService.getAllStates();
  }

  stateSelectionChanged(evt: MatSelectChange) {
    this.selectedDistrict = 0;
    this.districts$ = this.cowinService.getDistrictsOfState(evt.value);
  }

  searchByDistrict() {
    this.cowinService.getSlotsForDistrict(this.selectedDistrict).subscribe({
      next: (centers) => {
        console.log(centers);
      },
    });
  }
}
