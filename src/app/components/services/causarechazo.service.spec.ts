import { TestBed } from '@angular/core/testing';

import { CausarechazoService } from './causarechazo.service';

describe('CausarechazoService', () => {
  let service: CausarechazoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CausarechazoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
