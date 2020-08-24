import { TestBed } from '@angular/core/testing';

import { TypePersonsService } from './type-persons.service';

describe('TypePersonsService', () => {
  let service: TypePersonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePersonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
