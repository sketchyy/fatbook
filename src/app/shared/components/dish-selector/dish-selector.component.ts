import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlContainer, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { debounceTime, filter, mergeMap, startWith } from 'rxjs/operators';

import { Dish } from '../../models/dishes';
import { DishesService } from '../../services/dishes.service';

@Component({
  selector: 'cd-dish-selector',
  templateUrl: './dish-selector.component.html',
  styleUrls: ['./dish-selector.component.scss'],
  providers: [TitleCasePipe],
})
export class DishSelectorComponent implements OnInit {
  formGroup: UntypedFormGroup;
  dishOptions$: Observable<Dish[]>;
  displayFn: Function;

  get dish(): UntypedFormControl {
    return this.formGroup.get('dish') as UntypedFormControl;
  }

  get servingSize(): UntypedFormControl {
    return this.formGroup.get('servingSize') as UntypedFormControl;
  }

  constructor(
    private dishesService: DishesService,
    private titleCasePipe: TitleCasePipe,
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.formGroup = this.controlContainer.control as UntypedFormGroup;
    this.displayFn = this.display.bind(this);

    this.dishOptions$ = this.formGroup.get('dish').valueChanges.pipe(
      startWith(''),
      filter((query) => typeof query === 'string'),
      debounceTime(300), // TODO - more debounce?
      mergeMap((query) => this.dishesService.findByName(query))
    );
  }

  display(dish: Dish): string {
    return dish && dish.name ? this.titleCasePipe.transform(dish.name) : '';
  }

  onDishSelected(event: MatAutocompleteSelectedEvent) {
    const selectedDish: Dish = event.option.value;
    const servingSizeControl = this.formGroup.get('servingSize');
    if (
      servingSizeControl.value == null &&
      selectedDish.defaultServingSize != null
    ) {
      servingSizeControl.setValue(selectedDish.defaultServingSize);
    } else {
      servingSizeControl.setValue(null);
    }
  }
}
