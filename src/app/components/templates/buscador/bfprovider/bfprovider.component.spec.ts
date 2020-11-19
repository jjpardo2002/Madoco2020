import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfproviderComponent } from './bfprovider.component';

describe('BfproviderComponent', () => {
  let component: BfproviderComponent;
  let fixture: ComponentFixture<BfproviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfproviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
