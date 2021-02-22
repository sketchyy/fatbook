import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Ingredient } from './../../../models/ingredient';
import { IngredientsStorageService } from './../../services/ingredients-storage.service';
import { IngredientDialogComponent } from './../ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'cd-ingredients-page',
  template: `
    <div class="page">
      <div class="table-toolbar">
        <button mat-raised-button color="accent" (click)="onAddClick()">
          Add Ingredient
        </button>
      </div>
      <cd-ingredients-table
        [data]="tableData$ | async"
        (deleteClick)="onDeleteClick($event)"
      ></cd-ingredients-table>
    </div>
  `,
})
export class IngredientsPageComponent implements OnInit {
  tableData$: Observable<Ingredient[]>;

  constructor(
    private dialog: MatDialog,
    private ingredientsStorage: IngredientsStorageService
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.ingredientsStorage.items$;
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
        this.ingredientsStorage.add(result);
      });
  }

  onDeleteClick(ingredientId: any) {
    const confirmation = confirm("Are you sure?");

    if (confirmation) {
      this.ingredientsStorage.delete(ingredientId)
    }
  }
}
