import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DishesStorageService } from 'src/app/dishes/services/dishes-storage.service';
import { Dish } from 'src/app/models/dish';

import { DishUserInput } from './../../../models/dish-user-input';
import { AddDishComponent } from './../add-dish/add-dish.component';

@Component({
  selector: 'cd-dishes-page',
  templateUrl: './dishes-page.component.html',
  styleUrls: ['./dishes-page.component.scss'],
  providers: [DialogService],
})
export class DishesPageComponent implements OnInit {
  tableData$: Observable<Dish[]>;

  constructor(
    private dialogSerivce: DialogService,
    private dishesStorage: DishesStorageService
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.dishesStorage.getAll();
  }

  onAddDishClick() {
    let dialogRef = this.dialogSerivce.open(AddDishComponent, {
      // height: '575px',
      header: 'Add New Dish',
      width: '500px',
    });

    dialogRef.onClose
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: DishUserInput) => {
        this.dishesStorage.create(result);
      });
  }

  onDeleteDishClick(dishId: string) {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.dishesStorage.delete(dishId);
      this.loadData();
    }
  }

  private loadData() {
    // this.tableData$ = this.dishesStorage.items$;
  }
}
