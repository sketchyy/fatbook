import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import get from 'lodash-es/get';
import { ColDef } from './../../models/data-table';

@Component({
  selector: 'cd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @Input() colDefs: ColDef[];
  @Input()
  set rowData(newRowData: any[]) {
    if (newRowData) {
      this.dataSource.data = this.flattenData(newRowData);
    }
  }

  @Output() rowRemoved = new EventEmitter<string>();

  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource([]);
  displayedColumns: string[];

  constructor() {}

  ngOnInit() {
    this.displayedColumns = [
      ...this.colDefs.map((colDef) => colDef.field),
      'actions'
    ];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onDeleteClick(id: string) {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.rowRemoved.emit(id);
    }
  }

  private flattenData(givenData: any[]) {
    return givenData.map((givenRow) => {
      return this.colDefs.reduce((newRow, colDef) => {
        newRow[colDef.field] = get(givenRow, colDef.field);
        return newRow;
      }, { id: givenRow.id });
    });
  }
}
