import { TestBed } from '@angular/core/testing';

import { IngredientsStorageService } from './ingredients-storage.service';

describe('IngredientsStorageService', () => {
  let service: IngredientsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
