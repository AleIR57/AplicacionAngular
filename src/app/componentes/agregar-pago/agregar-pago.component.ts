import { FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-agregar-pago',
  templateUrl: './agregar-pago.component.html',
  styleUrls: ['./agregar-pago.component.css']
})
export class AgregarPagoComponent implements OnInit {
  elID: any;
  Envio: any;
  Oferta: any;
  Producto: any;
  Total: any;
  constructor(private activateRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador: Router) { 
    this.elID=this.activateRoute.snapshot.paramMap.get('id');

    this.crudService.ObtenerEnvio(this.elID).subscribe(respuesta => {
      this.Envio = respuesta;
     
      this.crudService.ObtenerOferta(respuesta[0]['idOferta']).subscribe(respuesta2 =>{
        this.Total = Number(respuesta2[0]['precio']) + 10900;
        this.Oferta = respuesta2;
        this.crudService.ObtenerProducto(respuesta2[0]['idProducto']).subscribe(respuesta3 =>{
          this.Producto = respuesta3;
        });
      });
    });
  }

@ViewChild('paypalRef', {static:true}) private paypalRef!: ElementRef;
  ngOnInit(): void {
    window.paypal.Buttons({
      style:{
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      },

      createOrder: (data:any, actions:any) =>{
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '1000',
              currency_code: 'USD'
            }
          }]
        });
      },
      onApprouve: (data:any, actions:any) =>{
        return actions.order.capture().then(() => {
            alert("Transacción completada");
        });
      },
      onError: () =>{
        console.log("Algo salió mal");
      }

    }).render(this.paypalRef.nativeElement);
  }

}
