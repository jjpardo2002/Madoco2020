import { TestBed } from '@angular/core/testing';

import { MiencuestaService } from './miencuesta.service';

describe('MiencuestaService', () => {
  let service: MiencuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiencuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
