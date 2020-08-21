import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BregionComponent } from './bregion.component';

describe('BregionComponent', () => {
  let component: BregionComponent;
  let fixture: ComponentFixture<BregionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BregionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
