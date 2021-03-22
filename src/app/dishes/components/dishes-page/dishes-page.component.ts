import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ColDef } from 'src/app/shared/models/data-table';
import { Dish, DishDialogMode } from 'src/app/shared/models/dishes';
import { DishesService } from 'src/app/shared/services/dishes.service';

import { DishSimpleDialogComponent } from './../dish-simple-dialog/dish-simple-dialog.component';

@Component({
  selector: 'cd-dishes-page',
  template: `
    <div class="page">
      <cd-data-table
        [colDefs]="colDefs"
        [rowData]="tableData$ | async"
        [editable]="true"
        (rowEdited)="onEditClick($event)"
        (rowRemoved)="onDeleteDishClick($event)"
      >
        <ng-template #toolbarTemplate>
          <button mat-raised-button color="accent" (click)="onAddDishClick()">
            Add Dish
          </button>
        </ng-template>
      </cd-data-table>
    </div>
  `,
  styleUrls: ['./dishes-page.component.scss'],
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
    let dialogRef = this.dialog.open(DishSimpleDialogComponent, {
      position: {
        top: '100px',
      },
    });

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
      position: {
        top: '100px',
      },
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
