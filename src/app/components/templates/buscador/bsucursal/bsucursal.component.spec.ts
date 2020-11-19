import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsucursalComponent } from './bsucursal.component';

describe('BsucursalComponent', () => {
  let component: BsucursalComponent;
  let fixture: ComponentFixture<BsucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
