import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dish } from 'src/app/models/dish';

@Component({
  selector: 'cd-dishes-table',
  templateUrl: './dishes-table.component.html',
  styleUrls: ['./dishes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishesTableComponent implements AfterViewInit {
  @Input()
  set data(value) {
    this.dataSource.data = value;
  }

  displayedColumns: string[] = [
    'name',
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
