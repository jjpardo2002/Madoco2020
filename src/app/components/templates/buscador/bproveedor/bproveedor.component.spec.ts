import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BproveedorComponent } from './bproveedor.component';

describe('BproveedorComponent', () => {
  let component: BproveedorComponent;
  let fixture: ComponentFixture<BproveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BproveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
