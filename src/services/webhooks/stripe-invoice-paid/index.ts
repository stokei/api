import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { WebhookStripeInvoiceWithPaymentErrorDTO } from '@/dtos/webhooks/webhook-stripe-invoice-with-payment-error.dto';
import { ChangeInvoiceToPaidService } from '@/services/invoices/change-invoice-to-paid';
import { FindInvoiceByStripeInvoiceService } from '@/services/invoices/find-invoice-by-stripe-invoice';
import { FindStripeInvoiceByIdService } from '@/services/stripe/find-invoice-by-id';

@Injectable()
export class WebhookStripeInvoicePaidService
  implements
    IBaseService<WebhookStripeInvoiceWithPaymentErrorDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findStripeInvoiceByIdService: FindStripeInvoiceByIdService,
    private readonly findInvoiceByStripeInvoiceService: FindInvoiceByStripeInvoiceService,
    private readonly changeInvoiceToPaidService: ChangeInvoiceToPaidService
  ) {}

  async execute(data: WebhookStripeInvoiceWithPaymentErrorDTO) {
    const stripeInvoice = await this.findStripeInvoiceByIdService.execute(
      data.invoice,
      data.stripeAccount
    );

    const invoice = await this.findInvoiceByStripeInvoiceService.execute(
      stripeInvoice.id as string
    );

    await this.changeInvoiceToPaidService.execute({
      app: invoice.app,
      invoice: invoice.id,
      paymentMethod: (stripeInvoice.payment_intent as Stripe.PaymentIntent)
        .payment_method as string,
      invoiceUrl: stripeInvoice.hosted_invoice_url,
      updatedBy: invoice.createdBy
    });
    return HttpStatus.OK;
  }
}
