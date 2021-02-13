import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class WeekGeneratorService {
  constructor() {}

  createWeekFromToday() {
    const today = dayjs();
    const week: Date[] = [];

    for (let i = 0; i < 7; i++) {
      week.push(today.subtract(i, 'day').toDate());
    }

    return week;
  }
}
