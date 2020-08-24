import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrolsComponent } from './brols.component';

describe('BrolsComponent', () => {
  let component: BrolsComponent;
  let fixture: ComponentFixture<BrolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
