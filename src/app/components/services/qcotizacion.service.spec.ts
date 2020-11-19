import { TestBed } from '@angular/core/testing';

import { QcotizacionService } from './qcotizacion.service';

describe('QcotizacionService', () => {
  let service: QcotizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QcotizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
