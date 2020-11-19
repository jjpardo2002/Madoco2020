import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcotizacionComponent } from './gcotizacion.component';

describe('GcotizacionComponent', () => {
  let component: GcotizacionComponent;
  let fixture: ComponentFixture<GcotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
