import { TestBed } from '@angular/core/testing';

import { ChordinateService } from './tuning.service';

describe('TuningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChordinateService = TestBed.get(ChordinateService);
    expect(service).toBeTruthy();
  });
});
