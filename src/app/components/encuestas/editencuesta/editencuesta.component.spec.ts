import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditencuestaComponent } from './editencuesta.component';

describe('EditencuestaComponent', () => {
  let component: EditencuestaComponent;
  let fixture: ComponentFixture<EditencuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditencuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
