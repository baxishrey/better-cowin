import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from './models/State';
import { CowinService } from './services/cowin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  states$: Observable<State[]>;
  constructor(private cowinService: CowinService) {
    this.states$ = new Observable();
  }
  ngOnInit(): void {
    this.states$ = this.cowinService.getAllStates();
  }
}
