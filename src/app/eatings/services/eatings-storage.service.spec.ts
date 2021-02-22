import { TestBed } from '@angular/core/testing';

import { EatingsStorageService } from './eatings-storage.service';

describe('EatingsStorageService', () => {
  let service: EatingsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EatingsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
