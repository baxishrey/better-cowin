import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Center, CenterResponse } from '../models/Center';
import { District, DistrictResponse } from '../models/District';
import { SearchBy } from '../models/SearchByType';
import { State, StateResponse } from '../models/State';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class CowinService {
  private centersFetched$ = new BehaviorSubject<Center[]>([]);
  stateChanged = new Subject<number>();
  newSearchRequested = new Subject<{ searchBy: SearchBy; parameter: number }>();

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

  getDistrictsOfState(state_id: number) {
    return this.httpClient
      .get<DistrictResponse>(
        `${environment.cowinApi}/v2/admin/location/districts/${state_id}`
      )
      .pipe(map((res) => res.districts));
  }

  getDistricts() {
    return this.stateChanged.pipe(
      switchMap((state_id) =>
        this.httpClient.get<DistrictResponse>(
          `${environment.cowinApi}/v2/admin/location/districts/${state_id}`
        )
      ),
      map((res) => res.districts)
    );
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

  getSlots() {
    return this.newSearchRequested.pipe(
      switchMap((newSearch) => {
        let params = new HttpParams().append(
          'date',
          this.dateService.getDateForApi()
        );
        switch (newSearch.searchBy) {
          case 'district':
            params = params.append(
              'district_id',
              newSearch.parameter.toString()
            );

            return this.httpClient
              .get<CenterResponse>(
                `${environment.cowinApi}/v2/appointment/sessions/public/calendarByDistrict`,
                { params }
              )
              .pipe(map((res) => res.centers));
          case 'pin':
            params = params.append('pincode', newSearch.parameter.toString());
            return this.httpClient
              .get<CenterResponse>(
                `${environment.cowinApi}/v2/appointment/sessions/public/calendarByPin`,
                { params }
              )
              .pipe(map((res) => res.centers));
        }
      })
    );
  }

  getSlotsForPinCode(pinCode: number): Observable<Center[]> {
    const params = new HttpParams()
      .append('pincode', pinCode.toString())
      .append('date', this.dateService.getDateForApi());

    return this.httpClient
      .get<CenterResponse>(
        `${environment.cowinApi}/v2/appointment/sessions/public/calendarByPin`,
        { params }
      )
      .pipe(
        map((res) => res.centers),
        tap((res) => this.centersFetched$.next(res))
      );
  }
}
