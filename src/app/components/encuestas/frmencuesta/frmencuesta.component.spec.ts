import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmencuestaComponent } from './frmencuesta.component';

describe('FrmencuestaComponent', () => {
  let component: FrmencuestaComponent;
  let fixture: ComponentFixture<FrmencuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmencuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
