import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPasajerosComponent } from './info-pasajeros.component';

describe('InfoPasajerosComponent', () => {
  let component: InfoPasajerosComponent;
  let fixture: ComponentFixture<InfoPasajerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPasajerosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPasajerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
