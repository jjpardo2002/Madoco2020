import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsfproviderComponent } from './bsfprovider.component';

describe('BsfproviderComponent', () => {
  let component: BsfproviderComponent;
  let fixture: ComponentFixture<BsfproviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsfproviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsfproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
