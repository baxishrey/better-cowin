import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Center, CenterResponse } from '../models/Center';
import { District, DistrictResponse } from '../models/District';
import { State, StateResponse } from '../models/State';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class CowinService {
  private centersFetched$ = new BehaviorSubject<Center[]>([]);

  get centersFetched() {
    return this.centersFetched$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private dateService: DateService
  ) {}

  getAllStates(): Observable<State[]> {
    return this.httpClient
      .get<StateResponse>(`${environment.cowinApi}/v2/admin/location/states`)
      .pipe(map((res) => res.states));
  }

  getDistrictsOfState(state_id: number): Observable<District[]> {
    return this.httpClient
      .get<DistrictResponse>(
        `${environment.cowinApi}/v2/admin/location/districts/${state_id}`
      )
      .pipe(map((res) => res.districts));
  }

  getSlotsForDistrict(district_id: number): Observable<Center[]> {
    const params = new HttpParams()
      .append('district_id', district_id.toString())
      .append('date', this.dateService.getDateForApi());

    return this.httpClient
      .get<CenterResponse>(
        `${environment.cowinApi}/v2/appointment/sessions/public/calendarByDistrict`,
        { params }
      )
      .pipe(
        map((res) => res.centers),
        tap((res) => this.centersFetched$.next(res))
      );
  }
}
