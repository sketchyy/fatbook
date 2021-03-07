import { Component, Input, OnInit } from '@angular/core';
import { LogEating } from 'src/app/models/log-eating';
import { ColDef } from 'src/app/shared/models/data-table';

import { LogDay } from './../../../models/log-day';

@Component({
  selector: 'cd-eating-log-entry',
  templateUrl: './eating-log-entry.component.html',
  styleUrls: ['./eating-log-entry.component.scss'],
})
export class EatingLogEntryComponent implements OnInit {
  @Input() logDay: LogDay;
  @Input() eatings: LogEating[];

  columns: ColDef[] = [
    { field: 'dishName', header: 'Dish Name' },
    { field: 'totals.proteins', header: 'Proteins', type: 'number' },
    { field: 'totals.fats', header: 'Fats', type: 'number' },
    { field: 'totals.carbs', header: 'Carbs', type: 'number' },
    { field: 'totals.calories', header: 'Calories', type: 'number' },
  ];
  foodValues = ['proteins', 'fats', 'carbs', 'calories'];

  constructor() {}

  ngOnInit(): void {}
}
