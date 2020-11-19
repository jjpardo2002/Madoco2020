import { TestBed } from '@angular/core/testing';

import { FproviderService } from './fprovider.service';

describe('FproviderService', () => {
  let service: FproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
