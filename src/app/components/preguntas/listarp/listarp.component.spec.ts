import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarpComponent } from './listarp.component';

describe('ListarpComponent', () => {
  let component: ListarpComponent;
  let fixture: ComponentFixture<ListarpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
