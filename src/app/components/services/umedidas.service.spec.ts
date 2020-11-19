import { TestBed } from '@angular/core/testing';

import { UmedidasService } from './umedidas.service';

describe('UmedidasService', () => {
  let service: UmedidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UmedidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
