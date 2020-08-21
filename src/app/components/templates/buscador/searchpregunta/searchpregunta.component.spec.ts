import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpreguntaComponent } from './searchpregunta.component';

describe('SearchpreguntaComponent', () => {
  let component: SearchpreguntaComponent;
  let fixture: ComponentFixture<SearchpreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchpreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchpreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
