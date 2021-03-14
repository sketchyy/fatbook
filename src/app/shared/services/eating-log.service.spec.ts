import { TestBed } from '@angular/core/testing';

import { EatingLogService } from './eating-log.service';

describe('EatingLogService', () => {
  let service: EatingLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EatingLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
