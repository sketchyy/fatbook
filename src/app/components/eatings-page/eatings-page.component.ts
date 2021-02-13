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
  styleUrls: ['./eatings-page.component.scss']
})
export class EatingsPageComponent implements OnInit {
  tableData$: Observable<Eating[]>;

  constructor(
    private dialog: MatDialog,
    private eatingsStorage: EatingsStorageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onAddDishClick() {
    let dialogRef = this.dialog.open(AddEatingComponent, {
      height: '325px',
      width: '500px',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => Boolean(result)))
      .subscribe((result: Eating) => {
        this.eatingsStorage.add(result);
        this.loadData();
      });
  }

  private loadData() {
    this.tableData$ = this.eatingsStorage.getAll();
  }
}
