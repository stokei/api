import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { WebhookStripeInvoiceWithPaymentErrorDTO } from '@/dtos/webhooks/webhook-stripe-invoice-with-payment-error.dto';
import { InvoiceStatus } from '@/enums/invoice-status.enum';
import { InvoiceModel } from '@/models/invoice.model';
import { FindCurrencyByIdService } from '@/services/currencies/find-currency-by-id';
import { ChangeInvoiceToPaidService } from '@/services/invoices/change-invoice-to-paid';
import { CreateInvoiceService } from '@/services/invoices/create-invoice';
import { FindInvoiceByStripeInvoiceService } from '@/services/invoices/find-invoice-by-stripe-invoice';
import { FindStripeInvoiceByIdService } from '@/services/stripe/find-invoice-by-id';
import { FindSubscriptionContractByStripeSubscriptionService } from '@/services/subscription-contracts/find-subscription-contract-by-stripe-subscription';

@Injectable()
export class WebhookStripeInvoicePaidService
  implements
    IBaseService<WebhookStripeInvoiceWithPaymentErrorDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findStripeInvoiceByIdService: FindStripeInvoiceByIdService,
    private readonly findInvoiceByStripeInvoiceService: FindInvoiceByStripeInvoiceService,
    private readonly changeInvoiceToPaidService: ChangeInvoiceToPaidService,
    private readonly findCurrencyByIdService: FindCurrencyByIdService,
    private readonly findSubscriptionContractByStripeSubscriptionService: FindSubscriptionContractByStripeSubscriptionService,
    private readonly createInvoiceService: CreateInvoiceService
  ) {}

  async execute(data: WebhookStripeInvoiceWithPaymentErrorDTO) {
    const stripeInvoice = await this.findStripeInvoiceByIdService.execute(
      data.invoice,
      data.stripeAccount
    );

    let invoice: InvoiceModel;
    try {
      invoice = await this.findInvoiceByStripeInvoiceService.execute(
        stripeInvoice.id as string
      );
    } catch (error) {
      const subscription =
        await this.findSubscriptionContractByStripeSubscriptionService.execute(
          stripeInvoice.subscription as string
        );

      const currency = await this.findCurrencyByIdService.execute(
        stripeInvoice.currency
      );

      invoice = await this.createInvoiceService.execute({
        app: subscription.app,
        subscription: subscription.id,
        paymentMethod: subscription.paymentMethod,
        status:
          stripeInvoice.status === 'paid'
            ? InvoiceStatus.PAID
            : InvoiceStatus.PENDING,
        stripeInvoice: stripeInvoice.id,
        url: stripeInvoice.hosted_invoice_url,
        createdBy: subscription.createdBy,
        currency: currency.id,
        customer: subscription.parent,
        subtotalAmount: stripeInvoice.subtotal,
        totalAmount: stripeInvoice.total
      });
    }

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
