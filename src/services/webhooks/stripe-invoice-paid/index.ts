import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { ChangeInvoiceToPaidService } from '@/services/invoices/change-invoice-to-paid';
import { FindInvoiceByStripeInvoiceService } from '@/services/invoices/find-invoice-by-stripe-invoice';
import { FindStripeInvoiceByIdService } from '@/services/stripe/find-invoice-by-id';

@Injectable()
export class WebhookStripeInvoicePaidService
  implements IBaseService<string, Promise<HttpStatus>>
{
  constructor(
    private readonly findStripeInvoiceByIdService: FindStripeInvoiceByIdService,
    private readonly findInvoiceByStripeInvoiceService: FindInvoiceByStripeInvoiceService,
    private readonly changeInvoiceToPaidService: ChangeInvoiceToPaidService
  ) {}

  async execute(stripeInvoiceId: string, stripeAccount?: string) {
    const stripeInvoice = await this.findStripeInvoiceByIdService.execute(
      stripeInvoiceId,
      stripeAccount
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
