import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-agregar-pago',
  templateUrl: './agregar-pago.component.html',
  styleUrls: ['./agregar-pago.component.css']
})
export class AgregarPagoComponent implements OnInit {

  constructor() { }
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
