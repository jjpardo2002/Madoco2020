import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsuppliesComponent } from './bsupplies.component';

describe('BsuppliesComponent', () => {
  let component: BsuppliesComponent;
  let fixture: ComponentFixture<BsuppliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsuppliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
