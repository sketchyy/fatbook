import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'cd-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss']
})
export class IngredientsTableComponent implements AfterViewInit {
  @Input()
  set data(value) {
    if (value) {
      this.dataSource.data = value;
    }
  }

  @Output() deleteClick = new EventEmitter<string>();

  displayedColumns: string[] = [
    'name',
    'proteins',
    'fats',
    'carbs',
    'calories',
    'actions',
  ];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onDeleteClick(dishId: string) {
    this.deleteClick.emit(dishId);
  }
}
