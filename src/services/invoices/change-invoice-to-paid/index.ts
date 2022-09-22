import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ChangeInvoiceToPaidCommand } from '@/commands/implements/invoices/change-invoice-to-paid.command';
import { ChangeInvoiceToPaidDTO } from '@/dtos/invoices/change-invoice-to-paid.dto';
import { InvoiceModel } from '@/models/invoice.model';

@Injectable()
export class ChangeInvoiceToPaidService
  implements IBaseService<ChangeInvoiceToPaidDTO, Promise<InvoiceModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ChangeInvoiceToPaidDTO): Promise<InvoiceModel> {
    return await this.commandBus.execute(new ChangeInvoiceToPaidCommand(data));
  }
}
