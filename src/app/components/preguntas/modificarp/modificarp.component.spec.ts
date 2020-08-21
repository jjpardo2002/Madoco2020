import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarpComponent } from './modificarp.component';

describe('ModificarpComponent', () => {
  let component: ModificarpComponent;
  let fixture: ComponentFixture<ModificarpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
