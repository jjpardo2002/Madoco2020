import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypepersonComponent } from './typeperson.component';

describe('TypepersonComponent', () => {
  let component: TypepersonComponent;
  let fixture: ComponentFixture<TypepersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypepersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypepersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
