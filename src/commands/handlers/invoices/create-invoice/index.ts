import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateInvoiceCommand } from '@/commands/implements/invoices/create-invoice.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  InvoiceNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { InvoiceModel } from '@/models/invoice.model';
import { CreateInvoiceRepository } from '@/repositories/invoices/create-invoice';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

type CreateInvoiceCommandKeys = keyof CreateInvoiceCommand;

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceCommandHandler
  implements ICommandHandler<CreateInvoiceCommand>
{
  constructor(
    private readonly createInvoiceRepository: CreateInvoiceRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateInvoiceCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateInvoiceCommandKeys>('app');
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const invoiceCreated = await this.createInvoiceRepository.execute({
      ...data,
      active: InvoiceModel.isActive(data.status)
    });
    if (!invoiceCreated) {
      throw new InvoiceNotFoundException();
    }
    const invoiceModel = this.publisher.mergeObjectContext(invoiceCreated);
    invoiceModel.createdInvoice({
      createdBy: data.createdBy
    });
    invoiceModel.commit();

    return invoiceCreated;
  }

  private clearData(command: CreateInvoiceCommand): CreateInvoiceCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      customer: cleanValue(command?.customer),
      subscription: cleanValue(command?.subscription),
      paymentMethod: cleanValue(command?.paymentMethod),
      product: cleanValue(command?.product),
      price: cleanValue(command?.price),
      currency: cleanValue(command?.currency),
      status: cleanValue(command?.status),
      totalAmount: cleanValueNumber(command?.totalAmount),
      subtotalAmount: cleanValueNumber(command?.subtotalAmount),
      stripeInvoice: cleanValue(command?.stripeInvoice)
    });
  }
}
