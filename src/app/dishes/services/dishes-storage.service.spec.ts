import { TestBed } from '@angular/core/testing';

import { DishesStorageService } from './dishes-storage.service';

describe('DishesStorageService', () => {
  let service: DishesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
