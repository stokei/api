import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { OrderStatus } from '@/enums/order-status.enum';

export interface CountOrdersWhereDTO {
  ids?: string[];
  app?: IWhereData;
  cart?: IWhereData;
  customer?: IWhereData;
  currency?: IWhereData;
  status?: OrderStatus;
  oldStatus?: OrderStatus;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountOrdersWhereDTO = keyof CountOrdersWhereDTO;

export type CountOrdersDTO = IBaseCountDTO<CountOrdersWhereDTO>;
