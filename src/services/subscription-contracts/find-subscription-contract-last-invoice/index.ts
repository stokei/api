import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { InvoiceModel } from '@/models/invoice.model';
import { FindAllInvoicesService } from '@/services/invoices/find-all-invoices';

@Injectable()
export class FindSubscriptionContractLastInvoiceService
  implements IBaseService<string, Promise<InvoiceModel>>
{
  constructor(
    private readonly findAllInvoicesService: FindAllInvoicesService
  ) {}

  async execute(subscriptionContract: string): Promise<InvoiceModel> {
    const invoices = await this.findAllInvoicesService.execute({
      page: {
        limit: 1
      },
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        AND: {
          subscription: {
            equals: subscriptionContract
          }
        }
      }
    });
    return invoices?.items?.[0];
  }
}
