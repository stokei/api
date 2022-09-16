import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateInvoiceRepositoryDTO } from '@/dtos/invoices/create-invoice-repository.dto';
import { InvoiceMapper } from '@/mappers/invoices';
import { InvoiceModel } from '@/models/invoice.model';

@Injectable()
export class CreateInvoiceRepository
  implements IBaseRepository<CreateInvoiceRepositoryDTO, Promise<InvoiceModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateInvoiceRepositoryDTO): Promise<InvoiceModel> {
    return new InvoiceMapper().toModel(
      await this.model.invoice.create({ data })
    );
  }
}
