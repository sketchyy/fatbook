import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ColDef } from 'src/app/shared/models/data-table';
import { Dish, DishDialogMode } from 'src/app/shared/models/dishes';
import { DishesService } from 'src/app/shared/services/dishes.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

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
        (onFilterChange)="onApplyFilter($event)"
      >
        <ng-template #toolbarTemplate>
          <button mat-raised-button color="accent" (click)="onAddDishClick()">
            Add Dish
          </button>
        </ng-template>
        <ng-template #expandedRowTemplate let-element="element">
          <cd-data-table
            *ngIf="element.ingredients?.length > 0; else noIngredients"
            [suppressToolbar]="true"
            [suppressActions]="true"
            [colDefs]="ingredientsColDefs"
            [rowData]="element.ingredients"
            class="mat-elevation-z4 m2 flex-1"
          >
          </cd-data-table>

          <ng-template #noIngredients>
            <h3>No ingredients</h3>
          </ng-template>
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
    {
      field: 'ingredients',
      hide: true,
    },
  ];

  ingredientsColDefs = [
    { field: 'dish.name', header: 'Name', type: 'title' },
    {
      field: 'dish.foodValue.proteins',
      header: 'Proteins (per 100g.)',
      type: 'number',
    },
    {
      field: 'dish.foodValue.fats',
      header: 'Fats (per 100g.)',
      type: 'number',
    },
    {
      field: 'dish.foodValue.carbs',
      header: 'Carbs (per 100g.)',
      type: 'number',
    },
    {
      field: 'dish.foodValue.calories',
      header: 'Calories (per 100g.)',
      type: 'number',
    },
    {
      field: 'servingSize',
      header: 'Serving Size (g.)',
      type: 'number',
    },
  ];

  constructor(
    private dialog: MatDialog,
    private dishesStorage: DishesService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.dishesStorage.getAll();
  }

  onAddDishClick() {
    let dialogRef = this.dialog.open(DishSimpleDialogComponent, {
      position: {
        top: '100px',
      },
      maxWidth: '100vw',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: Dish) => {
        this.spinner.show();

        this.dishesStorage
          .createSimple(result)
          .then(() => {
            this.notificationService.showSuccess('Eating saved');
          })
          .catch(() => {
            this.notificationService.showFail(
              'Error while saving :( contact Andrey'
            );
          })
          .finally(() => {
            this.spinner.hide();
          });
      });
  }

  onApplyFilter(filterValue: string) {
    this.tableData$ = this.dishesStorage.findByName(filterValue);
  }

  async onEditClick(dishId: string) {
    //TODO notification + spinner
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
    //TODO notification + spinner
    this.dishesStorage.delete(dishId);
  }
}
