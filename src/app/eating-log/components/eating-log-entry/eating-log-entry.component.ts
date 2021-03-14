import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef } from 'src/app/shared/models/data-table';
import { LogDay, Eating } from 'src/app/shared/models/eatings';

@Component({
  selector: 'cd-eating-log-entry',
  templateUrl: './eating-log-entry.component.html',
  styleUrls: ['./eating-log-entry.component.scss'],
})
export class EatingLogEntryComponent implements OnInit {
  @Input() logDay: LogDay;
  @Input() eatings: Eating[];

  @Output() eatingRemoved = new EventEmitter<Eating>();

  columns: ColDef[] = [
    { field: 'dish.name', header: 'Dish Name', type: 'title' },
    { field: 'servingSize', header: 'Serving (g)', type: 'number' },
    { field: 'totals.proteins', header: 'Proteins', type: 'number' },
    { field: 'totals.fats', header: 'Fats', type: 'number' },
    { field: 'totals.carbs', header: 'Carbs', type: 'number' },
    { field: 'totals.calories', header: 'Calories', type: 'number' },
  ];
  foodValues = ['proteins', 'fats', 'carbs', 'calories'];

  constructor() {}

  ngOnInit(): void {}

  onRowRemoved(eatingId: string) {
    const eating: Eating = this.eatings.find(
      (eating) => eating.id === eatingId
    );

    this.eatingRemoved.emit(eating);
  }
}
