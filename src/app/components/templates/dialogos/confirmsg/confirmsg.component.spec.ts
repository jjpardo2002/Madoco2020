import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmsgComponent } from './confirmsg.component';

describe('ConfirmsgComponent', () => {
  let component: ConfirmsgComponent;
  let fixture: ComponentFixture<ConfirmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
