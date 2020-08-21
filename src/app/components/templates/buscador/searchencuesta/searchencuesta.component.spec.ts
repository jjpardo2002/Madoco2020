import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchencuestaComponent } from './searchencuesta.component';

describe('SearchencuestaComponent', () => {
  let component: SearchencuestaComponent;
  let fixture: ComponentFixture<SearchencuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchencuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
