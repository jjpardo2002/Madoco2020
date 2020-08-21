import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BstateComponent } from './bstate.component';

describe('BstateComponent', () => {
  let component: BstateComponent;
  let fixture: ComponentFixture<BstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
