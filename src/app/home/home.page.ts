import { Component, OnInit } from '@angular/core';
declare var paypal: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  paymentAmount = 200;
  payPalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AZfa5sAt8gFQiJv-dJBsdTb81dAQzunBEtK6B76AARf4YXal8DCkD5QcWJSrJt7v0iaSxIVw7TF01DFo',
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: { total: this.paymentAmount, currency: 'USD' },
            }
          ],
          experience: {
            input_fields: {
              no_shipping: 0
            }
          }
        }
      });
    },
    onApprove: (data, actions) => {
      // This function captures the funds from the transaction.
      return actions.order.capture().then((details) => {
        // This function shows a transaction success message to your buyer.
        alert('Transaction completed by ' + details.payer.name.given_name);
      });
    }
  };

  constructor() { }

  ionViewDidEnter(): void {
    this.payButtonHandler();
  }

  payButtonHandler() {
    console.log(paypal);
    // paypal.Buttons(this.payPalConfig).render('#paypal-button');
    paypal.Buttons({
      style: {
        layout: 'vertical',
        // color: 'blue',
        shape: 'pill',
        label: 'paypal'
      },
      createOrder: (data, actions) => {
        // Set up the transaction
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01'
            }
          }],
          shipping_type: 'PICKUP',
          application_context: {
            shipping_preference: 'NO_SHIPPING'
          }
        });
      },
      onApprove: (data, actions) => {
        // This function captures the funds from the transaction.
        return actions.order.capture().then((details) => {
          // This function shows a transaction success message to your buyer.
          alert(details.payer.name.given_name + ' ' + details.payer.name.surname + ' su pago se realizo satisfactoriamente.');
         });
       }
    }).render('#paypal-button');
  }
}
