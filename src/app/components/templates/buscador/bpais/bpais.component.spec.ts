import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpaisComponent } from './bpais.component';

describe('BpaisComponent', () => {
  let component: BpaisComponent;
  let fixture: ComponentFixture<BpaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
