import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDeUsuarioComponent } from './productos-de-usuario.component';

describe('ProductosDeUsuarioComponent', () => {
  let component: ProductosDeUsuarioComponent;
  let fixture: ComponentFixture<ProductosDeUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosDeUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosDeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
