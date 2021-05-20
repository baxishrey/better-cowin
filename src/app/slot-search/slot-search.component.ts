import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { District } from '../models/District';
import { SearchBy } from '../models/SearchByType';
import { State } from '../models/State';
import { CowinService } from '../services/cowin.service';

@Component({
  selector: 'app-slot-search',
  templateUrl: './slot-search.component.html',
  styleUrls: ['./slot-search.component.scss'],
})
export class SlotSearchComponent implements OnInit {
  states!: State[];
  districts!: District[];
  selectedDistrict = 0;
  searchBy: SearchBy = 'pin';
  pinCode!: number;

  constructor(private cowinService: CowinService) {}

  ngOnInit(): void {
    this.cowinService.getAllStates().subscribe({
      next: (states) => {
        this.states = states;
      },
    });
    this.cowinService.getDistricts().subscribe({
      next: (districts) => {
        this.districts = districts;
      },
    });
  }

  stateSelectionChanged(evt: MatSelectChange) {
    this.selectedDistrict = 0;
    this.cowinService.stateChanged.next(evt.value);
  }

  searchByChanged(evt: MatButtonToggleChange) {
    if (this.searchBy == 'pin') {
      this.selectedDistrict = 0;
    }
  }

  search() {
    if (this.searchBy == 'district') {
      // this.cowinService.getSlotsForDistrict(this.selectedDistrict).subscribe({
      //   next: (centers) => {
      //   },
      // });
      this.cowinService.newSearchRequested.next({
        searchBy: 'district',
        parameter: this.selectedDistrict,
      });
    } else {
      // this.cowinService.getSlotsForPinCode(this.pinCode).subscribe({
      //   next: (centers) => {},
      // });
      this.cowinService.newSearchRequested.next({
        searchBy: 'pin',
        parameter: this.pinCode,
      });
    }
  }

  isSubmitButtonDisabled() {
    return (
      (this.searchBy == 'district' && !this.selectedDistrict) ||
      (this.searchBy == 'pin' && !this.isValidPincode())
    );
  }

  isValidPincode() {
    return this.pinCode && this.pinCode.toString().length == 6;
  }
}
