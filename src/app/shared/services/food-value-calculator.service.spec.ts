import { TestBed } from '@angular/core/testing';

import { FoodValueCalculator } from './food-value-calculator.service';

describe('FoodValueCalculatorService', () => {
  let service: FoodValueCalculator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodValueCalculator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
