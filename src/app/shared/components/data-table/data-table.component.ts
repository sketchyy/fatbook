import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
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
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @Input() colDefs: ColDef[];
  @Input()
  set rowData(newRowData: any[]) {
    if (newRowData) {
      this.dataSource.data = this.flattenData(newRowData);
    }
  }
  @Input() editable: boolean;
  @Input() suppressToolbar: boolean;
  @Input() suppressActions: boolean;

  @Output() rowEdited = new EventEmitter<string>();
  @Output() rowRemoved = new EventEmitter<string>();

  @ContentChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;
  @ContentChild('expandedRowTemplate') expandedRowTemplate: TemplateRef<any>;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource([]);
  displayedColumns: string[];
  expandedElement: any;

  constructor() {}

  ngOnInit() {
    this.displayedColumns = this.colDefs
      .filter((colDef) => !colDef.hide)
      .map((colDef) => colDef.field);

    if (!this.suppressActions) {
      this.displayedColumns.push('actions');
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onEditClick(id: string) {
    this.rowEdited.emit(id);
  }

  onDeleteClick(id: string) {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.rowRemoved.emit(id);
    }
  }

  onExpandClick(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private flattenData(givenData: any[]) {
    return givenData.map((givenRow) => {
      return this.colDefs.reduce(
        (newRow, colDef) => {
          newRow[colDef.field] = get(givenRow, colDef.field);
          return newRow;
        },
        { id: givenRow.id }
      );
    });
  }
}
