import { EatingsStorageService } from './../../services/eatings-storage.service';
import { AddEatingComponent } from './../add-eating/add-eating.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DishesStorageService } from 'src/app/dishes/services/dishes-storage.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Eating } from 'src/app/models/eating';
import { WeekGeneratorService } from 'src/app/core/services/week-generator.service';
import { EatingUserInput } from 'src/app/models/eating-user-input';

@Component({
  selector: 'cd-eatings-page',
  templateUrl: './eatings-page.component.html',
  styleUrls: ['./eatings-page.component.scss'],
})
export class EatingsPageComponent implements OnInit {
  tableData$: Observable<Eating[]>;
  week: Date[];
  tableData: Map<Date, Observable<Eating[]>> = new Map();
  dishNames: any[];

  constructor(
    private dialog: MatDialog,
    private eatingsStorage: EatingsStorageService,
    private dishesStorage: DishesStorageService,
    private weekGenerator: WeekGeneratorService
  ) {}

  ngOnInit(): void {
    this.week = this.weekGenerator.createWeekFromToday();


    this.week.forEach(day => {
      this.tableData.set(day, this.eatingsStorage.getForDay(day))
    })

    this.tableData$ = this.eatingsStorage.items$;
     /* this.dishesStorage.dishNames$.subscribe(dishNames => this.dishNames = dishNames); */
    // this.loadData();
  }

  onAddEatingClick() {

    let dialogRef = this.dialog.open(AddEatingComponent, {
      height: '325px',
      width: '500px',
      data: { dishNames: this.dishNames },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: EatingUserInput) => {
        this.eatingsStorage.add(result);
        // this.loadData();
      });
  }

  onDeleteEatingClick(eating: Eating) {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.eatingsStorage.delete(eating.id);
    }
  }
}
