import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
    this.dataSource.data = value;
  }

  displayedColumns: string[] = [
    'time',
    'dishName',
    'portionSize',
    'fat',
    'protein',
    'carbohydrate',
    'calories',
  ];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
