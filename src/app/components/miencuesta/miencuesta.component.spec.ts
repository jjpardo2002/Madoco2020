import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiencuestaComponent } from './miencuesta.component';

describe('MiencuestaComponent', () => {
  let component: MiencuestaComponent;
  let fixture: ComponentFixture<MiencuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiencuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
