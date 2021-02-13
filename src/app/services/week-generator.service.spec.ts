import { TestBed } from '@angular/core/testing';

import { WeekGeneratorService } from './week-generator.service';

describe('WeekGeneratorService', () => {
  let service: WeekGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
