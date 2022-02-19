import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVuelosComponent } from './info-vuelos.component';

describe('InfoVuelosComponent', () => {
  let component: InfoVuelosComponent;
  let fixture: ComponentFixture<InfoVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoVuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
