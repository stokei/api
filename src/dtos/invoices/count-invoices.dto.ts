import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { InvoiceStatus } from '@/enums/invoice-status.enum';

export interface CountInvoicesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  customer?: IWhereData;
  subscription?: IWhereData;
  currency?: IWhereData;
  status?: InvoiceStatus;
  active?: IWhereData<boolean>;
  stripeInvoice?: IWhereData;
  stripeCheckoutSession?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountInvoicesWhereDTO = keyof CountInvoicesWhereDTO;

export type CountInvoicesDTO = IBaseCountDTO<CountInvoicesWhereDTO>;
