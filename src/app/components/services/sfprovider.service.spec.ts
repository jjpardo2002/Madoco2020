import { TestBed } from '@angular/core/testing';

import { SfproviderService } from './sfprovider.service';

describe('SfproviderService', () => {
  let service: SfproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
