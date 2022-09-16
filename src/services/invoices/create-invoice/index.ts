import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateInvoiceCommand } from '@/commands/implements/invoices/create-invoice.command';
import { CreateInvoiceDTO } from '@/dtos/invoices/create-invoice.dto';
import { InvoiceModel } from '@/models/invoice.model';

@Injectable()
export class CreateInvoiceService
  implements IBaseService<CreateInvoiceDTO, Promise<InvoiceModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateInvoiceDTO): Promise<InvoiceModel> {
    return await this.commandBus.execute(new CreateInvoiceCommand(data));
  }
}
