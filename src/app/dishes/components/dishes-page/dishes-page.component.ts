import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DishesService } from 'src/app/dishes/services/dishes.service';
import { Dish } from 'src/app/models/dish';
import { ColDef } from 'src/app/shared/models/data-table';

import { DishDialogMode } from './../../../models/dish-dialog-mode';
import { DishSimpleDialogComponent } from './../dish-simple-dialog/dish-simple-dialog.component';

@Component({
  selector: 'cd-dishes-page',
  template: `
    <div class="page">
      <div class="table-toolbar">
        <button mat-raised-button color="accent" (click)="onAddDishClick()">
          Add Dish
        </button>
      </div>
      <cd-data-table
        [colDefs]="colDefs"
        [rowData]="tableData$ | async"
        [editable]="true"
        (rowEdited)="onEditClick($event)"
        (rowRemoved)="onDeleteDishClick($event)"
      ></cd-data-table>
    </div>
  `,
  styleUrls: ['./dishes-page.component.scss'],
  providers: [DialogService],
})
export class DishesPageComponent implements OnInit {
  tableData$: Observable<Dish[]>;
  colDefs: ColDef[] = [
    { field: 'name', header: 'Name', type: 'title' },
    {
      field: 'foodValue.proteins',
      header: 'Proteins (per 100g.)',
      type: 'number',
    },
    { field: 'foodValue.fats', header: 'Fats (per 100g.)', type: 'number' },
    { field: 'foodValue.carbs', header: 'Carbs (per 100g.)', type: 'number' },
    {
      field: 'foodValue.calories',
      header: 'Calories (per 100g.)',
      type: 'number',
    },
    {
      field: 'defaultServingSize',
      header: 'Serving Size (g.)',
      type: 'number',
    },
  ];

  constructor(
    private dialog: MatDialog,
    private dishesStorage: DishesService
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.dishesStorage.getAll();
  }

  onAddDishClick() {
    let dialogRef = this.dialog.open(DishSimpleDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: Dish) => {
        this.dishesStorage.createSimple(result);
      });
  }

  async onEditClick(dishId: string) {
    const dish = await this.dishesStorage.get(dishId).toPromise();

    let dialogRef = this.dialog.open(DishSimpleDialogComponent, {
      data: {
        mode: DishDialogMode.Edit,
        dish: dish,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: Dish) => {
        this.dishesStorage.replace(dishId, result);
      });
  }

  onDeleteDishClick(dishId: string) {
    this.dishesStorage.delete(dishId);
  }
}
