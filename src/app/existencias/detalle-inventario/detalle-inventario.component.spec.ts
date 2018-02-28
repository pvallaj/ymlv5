import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInventarioComponent } from './detalle-inventario.component';

describe('DetalleInventarioComponent', () => {
  let component: DetalleInventarioComponent;
  let fixture: ComponentFixture<DetalleInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
