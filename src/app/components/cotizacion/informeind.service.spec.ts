import { TestBed } from '@angular/core/testing';

import { InformeindService } from './informeind.service';

describe('InformeindService', () => {
  let service: InformeindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformeindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
