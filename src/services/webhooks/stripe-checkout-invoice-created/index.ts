import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookStripeCheckoutInvoiceCreatedDTO } from '@/dtos/webhooks/webhook-stripe-checkout-invoice-created.dto';
import { InvoiceStatus } from '@/enums/invoice-status.enum';
import { FindCurrencyByIdService } from '@/services/currencies/find-currency-by-id';
import { CreateInvoiceService } from '@/services/invoices/create-invoice';
import { FindStripeInvoiceByIdService } from '@/services/stripe/find-invoice-by-id';
import { FindSubscriptionContractByStripeSubscriptionService } from '@/services/subscription-contracts/find-subscription-contract-by-stripe-subscription';

@Injectable()
export class WebhookStripeCheckoutInvoiceCreatedService
  implements
    IBaseService<WebhookStripeCheckoutInvoiceCreatedDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findStripeInvoiceByIdService: FindStripeInvoiceByIdService,
    private readonly findCurrencyByIdService: FindCurrencyByIdService,
    private readonly findSubscriptionContractByStripeSubscriptionService: FindSubscriptionContractByStripeSubscriptionService,
    private readonly createInvoiceService: CreateInvoiceService
  ) {}

  async execute(data: WebhookStripeCheckoutInvoiceCreatedDTO) {
    const stripeInvoice = await this.findStripeInvoiceByIdService.execute(
      data.invoice,
      data.stripeAccount
    );

    const subscription =
      await this.findSubscriptionContractByStripeSubscriptionService.execute(
        stripeInvoice.subscription as string
      );

    const currency = await this.findCurrencyByIdService.execute(
      stripeInvoice.currency
    );

    await this.createInvoiceService.execute({
      app: subscription.app,
      subscription: subscription.id,
      price: subscription.invoicePrice,
      product: subscription.invoiceProduct,
      status: subscription.active ? InvoiceStatus.PAID : InvoiceStatus.PENDING,
      stripeInvoice: stripeInvoice.id,
      createdBy: subscription.createdBy,
      currency: currency.id,
      customer: subscription.parent,
      subtotalAmount: stripeInvoice.subtotal,
      totalAmount: stripeInvoice.total
    });
    return HttpStatus.OK;
  }
}
