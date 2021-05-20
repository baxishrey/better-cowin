import { Injectable } from '@angular/core';
import { addDays, format, isBefore } from 'date-fns';

type dateIndex = 'dateKey' | 'date';
export type DateValues = { [key in dateIndex]: string };

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getDateForApi(): string {
    return format(new Date(), 'dd-MM-yyyy');
  }

  getAllDatesOfWeekFromToday(): DateValues[] {
    let day = this.stripTime(new Date());
    const dates: DateValues[] = [
      { dateKey: format(day, 'dd-MM-yyyy'), date: format(day, 'dd-MMM-yyyy') },
    ];
    const sixthDay = this.stripTime(addDays(new Date(), 6));
    while (isBefore(day, sixthDay)) {
      day = this.stripTime(addDays(day, 1));
      dates.push({
        dateKey: format(day, 'dd-MM-yyyy'),
        date: format(day, 'dd-MMM-yyyy'),
      });
    }
    return dates;
  }

  private stripTime(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
