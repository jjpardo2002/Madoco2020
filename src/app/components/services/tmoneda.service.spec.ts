import { TestBed } from '@angular/core/testing';

import { TmonedaService } from './tmoneda.service';

describe('TmonedaService', () => {
  let service: TmonedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmonedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
