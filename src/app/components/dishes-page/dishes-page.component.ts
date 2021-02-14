import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Dish } from 'src/app/models/dish';
import { DishesStorageService } from 'src/app/services/dishes-storage.service';

import { AddDishComponent } from './../add-dish/add-dish.component';

@Component({
  selector: 'cd-dishes-page',
  templateUrl: './dishes-page.component.html',
  styleUrls: ['./dishes-page.component.scss'],
})
export class DishesPageComponent implements OnInit {
  tableData$: Observable<Dish[]>;

  constructor(
    private dialog: MatDialog,
    private dishesStorage: DishesStorageService,
    ) {}

    ngOnInit(): void {
    this.loadData();
  }

  onAddDishClick() {
    let dialogRef = this.dialog.open(AddDishComponent, {
      height: '575px',
      width: '500px',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: Dish) => {
        this.dishesStorage.add(result);
        this.loadData();
      });
  }

  onDeleteDishClick(dishId: string) {
    const confirmation = confirm("Are you sure?");

    if (confirmation) {
      this.dishesStorage.delete(dishId)
      this.loadData();
    }
  }

  private loadData() {
    this.tableData$ = this.dishesStorage.items$;
  }
}
