import { WeekGeneratorService } from './../../services/week-generator.service';
import { EatingsStorageService } from './../../services/eatings-storage.service';
import { AddEatingComponent } from './../add-eating/add-eating.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DishesStorageService } from 'src/app/services/dishes-storage.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Eating } from 'src/app/models/eating';

@Component({
  selector: 'cd-eatings-page',
  templateUrl: './eatings-page.component.html',
  styleUrls: ['./eatings-page.component.scss'],
})
export class EatingsPageComponent implements OnInit {
  tableData$: Observable<Eating[]>;
  week: Date[];
  tableData: Map<Date, Eating[]> = new Map();

  constructor(
    private dialog: MatDialog,
    private eatingsStorage: EatingsStorageService,
    private dishesStorage: DishesStorageService,
    private weekGenerator: WeekGeneratorService
  ) {}

  ngOnInit(): void {
    this.week = this.weekGenerator.createWeekFromToday();
    this.loadData();
  }

  onAddEatingClick() {
    const dishNames = this.dishesStorage.getDishNames();

    let dialogRef = this.dialog.open(AddEatingComponent, {
      height: '325px',
      width: '500px',
      data: { dishNames },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: Eating) => {
        this.eatingsStorage.add(result);
        this.loadData();
      });
  }

  onDeleteEatingClick(eating: Eating) {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.eatingsStorage.delete(eating);
      this.loadData();
    }
  }

  private loadData() {
    this.week.forEach(day => {
      const eatingsPerDay = this.eatingsStorage.getForDay(day);
      this.tableData.set(day, eatingsPerDay);
    })
  }


}
