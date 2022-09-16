import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllInvoicesService } from '@/services/invoices/find-all-invoices';

@Injectable({ scope: Scope.REQUEST })
export class InvoicesLoader {
  constructor(private readonly invoicesService: FindAllInvoicesService) {}

  readonly findByIds = new DataLoader(async (invoiceIds: string[]) => {
    const invoices = await this.invoicesService.execute({
      where: {
        AND: {
          ids: invoiceIds
        }
      }
    });
    const invoicesMap = new Map(
      invoices?.items?.map((invoice) => [invoice.id, invoice])
    );
    return invoiceIds.map((invoiceId) => invoicesMap.get(invoiceId));
  });
}
