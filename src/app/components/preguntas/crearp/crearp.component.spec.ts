import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearpComponent } from './crearp.component';

describe('CrearpComponent', () => {
  let component: CrearpComponent;
  let fixture: ComponentFixture<CrearpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
