import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapreguntaComponent } from './listapregunta.component';

describe('ListapreguntaComponent', () => {
  let component: ListapreguntaComponent;
  let fixture: ComponentFixture<ListapreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListapreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListapreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
