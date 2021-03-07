import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IngredientsService } from '../../services/ingredients.service';
import { Ingredient } from './../../../models/ingredient';
import { ColDef } from './../../../shared/models/data-table';
import { IngredientDialogComponent } from './../ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'cd-ingredients-page',
  template: `
    <div class="page">
      <div class="table-toolbar">
        <button mat-raised-button color="accent" (click)="onAddClick()">
          Add Ingredient
        </button>
        <button mat-raised-button color="accent" (click)="createMocks()">
          Add Mock Data
        </button>
      </div>
      <cd-data-table
        [colDefs]="colDefs"
        [rowData]="tableData$ | async"
        (rowRemoved)="onRowRemoved($event)"
      ></cd-data-table>
    </div>
  `,
})
export class IngredientsPageComponent implements OnInit {
  colDefs: ColDef[] = [
    { field: 'name', header: 'Name', type: 'title' },
    { field: 'foodValue.proteins', header: 'Proteins', type: 'number' },
    { field: 'foodValue.fats', header: 'Fats', type: 'number' },
    { field: 'foodValue.carbs', header: 'Carbs', type: 'number' },
    { field: 'foodValue.calories', header: 'Calories', type: 'number' },
  ];
  tableData$: Observable<Ingredient[]>;

  constructor(
    private dialog: MatDialog,
    private ingredientsService: IngredientsService
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.ingredientsService.getAll();
  }

  onAddClick() {
    let dialogRef = this.dialog.open(IngredientDialogComponent, {
      height: '575px',
      width: '500px',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: Ingredient) => {
        this.ingredientsService.create(result);
      });
  }

  onRowRemoved(ingredientId: any) {
    this.ingredientsService.delete(ingredientId);
  }

  createMocks() {
    const mockIngrs: Ingredient[] = [
      {
        name: 'Сыр',
        foodValue: {
          proteins: Math.random() * 100,
          fats: Math.random() * 100,
          carbs: Math.random() * 100,
          calories: Math.random() * 1000,
        },
      },
      {
        name: 'Помидор',
        foodValue: {
          proteins: Math.random() * 100,
          fats: Math.random() * 100,
          carbs: Math.random() * 100,
          calories: Math.random() * 1000,
        },
      },
      {
        name: 'Рис',
        foodValue: {
          proteins: Math.random() * 100,
          fats: Math.random() * 100,
          carbs: Math.random() * 100,
          calories: Math.random() * 1000,
        },
      },
      {
        name: 'Курица',
        foodValue: {
          proteins: Math.random() * 100,
          fats: Math.random() * 100,
          carbs: Math.random() * 100,
          calories: Math.random() * 1000,
        },
      },
      {
        name: 'Кофе',
        foodValue: {
          proteins: Math.random() * 100,
          fats: Math.random() * 100,
          carbs: Math.random() * 100,
          calories: Math.random() * 1000,
        },
      },
    ];

    mockIngrs.forEach((i) => {
      this.ingredientsService.create(i);
    });
  }
}
