import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { ChangeInvoiceToPaymentErrorCommand } from '@/commands/implements/invoices/change-invoice-to-payment-error.command';
import { ChangeInvoiceToPaymentErrorRepositoryDataDTO } from '@/dtos/invoices/change-invoice-to-payment-error-repository.dto';
import { InvoiceStatus } from '@/enums/invoice-status.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  InvoiceNotFoundException,
  ParamNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { InvoiceModel } from '@/models/invoice.model';
import { ChangeInvoiceToPaymentErrorRepository } from '@/repositories/invoices/change-invoice-to-payment-error';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindInvoiceByIdService } from '@/services/invoices/find-invoice-by-id';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

type ChangeInvoiceToPaymentErrorCommandKeys =
  keyof ChangeInvoiceToPaymentErrorCommand;

@CommandHandler(ChangeInvoiceToPaymentErrorCommand)
export class ChangeInvoiceToPaymentErrorCommandHandler
  implements ICommandHandler<ChangeInvoiceToPaymentErrorCommand>
{
  constructor(
    private readonly changeInvoiceToPaymentErrorRepository: ChangeInvoiceToPaymentErrorRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly findInvoiceByIdService: FindInvoiceByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ChangeInvoiceToPaymentErrorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<ChangeInvoiceToPaymentErrorCommandKeys>(
        'app'
      );
    }
    if (!data?.invoice) {
      throw new ParamNotFoundException<ChangeInvoiceToPaymentErrorCommandKeys>(
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

    const dataChangeInvoiceToPaymentError: ChangeInvoiceToPaymentErrorRepositoryDataDTO =
      {
        active: true,
        url: data.invoiceUrl,
        status: InvoiceStatus.PAID,
        paymentMethod: data.paymentMethod,
        paymentErrorAt: convertToISODateString(Date.now()),
        updatedBy: data.updatedBy
      };
    const invoiceUpdated =
      await this.changeInvoiceToPaymentErrorRepository.execute({
        data: dataChangeInvoiceToPaymentError,
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
      ...dataChangeInvoiceToPaymentError
    });
    const invoiceModel = this.publisher.mergeObjectContext(invoiceChanged);
    invoiceModel.changedInvoiceToPaymentError();
    invoiceModel.commit();

    return invoiceChanged;
  }

  private clearData(
    command: ChangeInvoiceToPaymentErrorCommand
  ): ChangeInvoiceToPaymentErrorCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      invoice: cleanValue(command?.invoice),
      invoiceUrl: cleanValue(command?.invoiceUrl),
      paymentMethod: cleanValue(command?.paymentMethod),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
