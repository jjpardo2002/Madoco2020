import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarmsgComponent } from './warmsg.component';

describe('WarmsgComponent', () => {
  let component: WarmsgComponent;
  let fixture: ComponentFixture<WarmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
