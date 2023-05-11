import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { ChangeInvoiceToPaidCommand } from '@/commands/implements/invoices/change-invoice-to-paid.command';
import { ChangeInvoiceToPaidRepositoryDataDTO } from '@/dtos/invoices/change-invoice-to-paid-repository.dto';
import { InvoiceStatus } from '@/enums/invoice-status.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  InvoiceNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { InvoiceModel } from '@/models/invoice.model';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { ChangeInvoiceToPaidRepository } from '@/repositories/invoices/change-invoice-to-paid';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindInvoiceByIdService } from '@/services/invoices/find-invoice-by-id';
import { CreatePaymentMethodService } from '@/services/payment-methods/create-payment-method';
import { FindPaymentMethodByStripePaymentMethodService } from '@/services/payment-methods/find-payment-method-by-stripe-payment-method';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

type ChangeInvoiceToPaidCommandKeys = keyof ChangeInvoiceToPaidCommand;

@CommandHandler(ChangeInvoiceToPaidCommand)
export class ChangeInvoiceToPaidCommandHandler
  implements ICommandHandler<ChangeInvoiceToPaidCommand>
{
  constructor(
    private readonly changeInvoiceToPaidRepository: ChangeInvoiceToPaidRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly createPaymentMethodService: CreatePaymentMethodService,
    private readonly findPaymentMethodByStripePaymentMethodService: FindPaymentMethodByStripePaymentMethodService,
    private readonly findInvoiceByIdService: FindInvoiceByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ChangeInvoiceToPaidCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<ChangeInvoiceToPaidCommandKeys>('app');
    }
    if (!data?.invoice) {
      throw new ParamNotFoundException<ChangeInvoiceToPaidCommandKeys>(
        'invoice'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const invoice = await this.findInvoiceByIdService.execute(data.invoice);
    if (!invoice) {
      throw new InvoiceNotFoundException();
    }
    const subscriptionContract =
      await this.findSubscriptionContractByIdService.execute(
        invoice.subscription
      );
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }
    let paymentMethodId = subscriptionContract.paymentMethod;
    if (!paymentMethodId && !!data.paymentMethod) {
      let paymentMethod: PaymentMethodModel;
      try {
        paymentMethod =
          await this.findPaymentMethodByStripePaymentMethodService.execute(
            data.paymentMethod
          );
      } catch (error) {
        paymentMethod = await this.createPaymentMethodService.execute({
          app: app.id,
          parent: invoice.customer,
          stripePaymentMethod: data.paymentMethod,
          createdBy: data.updatedBy
        });
      }
      if (!paymentMethod) {
        throw new PaymentMethodNotFoundException();
      }
      paymentMethodId = paymentMethod.id;
    }

    const dataChangeInvoiceToPaid: ChangeInvoiceToPaidRepositoryDataDTO = {
      active: true,
      url: data.invoiceUrl,
      status: InvoiceStatus.PAID,
      paymentMethod: paymentMethodId,
      paidAt: convertToISODateString(Date.now()),
      updatedBy: data.updatedBy
    };
    const invoiceUpdated = await this.changeInvoiceToPaidRepository.execute({
      data: dataChangeInvoiceToPaid,
      where: {
        app: app.id,
        invoice: splitServiceId(invoice.id)?.id
      }
    });
    if (!invoiceUpdated) {
      throw new InvoiceNotFoundException();
    }
    const invoiceChanged = new InvoiceModel({
      ...invoice,
      ...dataChangeInvoiceToPaid
    });
    const invoiceModel = this.publisher.mergeObjectContext(invoiceChanged);
    invoiceModel.changedInvoiceToPaid();
    invoiceModel.commit();

    return invoiceChanged;
  }

  private clearData(
    command: ChangeInvoiceToPaidCommand
  ): ChangeInvoiceToPaidCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      invoice: cleanValue(command?.invoice),
      invoiceUrl: cleanValue(command?.invoiceUrl),
      paymentMethod: cleanValue(command?.paymentMethod),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
