import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeindComponent } from './informeind.component';

describe('InformeindComponent', () => {
  let component: InformeindComponent;
  let fixture: ComponentFixture<InformeindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
