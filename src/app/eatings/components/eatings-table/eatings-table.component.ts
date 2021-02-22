import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Eating } from 'src/app/models/eating';

@Component({
  selector: 'cd-eatings-table',
  templateUrl: './eatings-table.component.html',
  styleUrls: ['./eatings-table.component.scss'],
})
export class EatingsTableComponent {
  @Input()
  set data(value: Eating[]) {
    if (value) {
      this.dataSource.data = value;
    }
  }

  @Output() deleteClick = new EventEmitter<Eating>();

  displayedColumns: string[] = [
    'dishName',
    'portionSize',
    'fat',
    'protein',
    'carbohydrate',
    'calories',
    'actions',
  ];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onDeleteClick(eating: Eating) {
    this.deleteClick.emit(eating);
  }

  getTotals(column: string) {
    if (!this.dataSource.data) {
      return 0;
    }

    return this.dataSource.data.reduce(
      (result, curr) => result + curr[column],
      0
    );
  }
}
