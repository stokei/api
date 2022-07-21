import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { OrderStatus } from '@/enums/order-status.enum';

export interface CountOrdersWhereDTO {
  ids?: string[];
  project?: IWhereData;
  cart?: IWhereData;
  customer?: IWhereData;
  currency?: IWhereData;
  status?: IWhereData<OrderStatus>;
  oldStatus?: IWhereData<OrderStatus>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountOrdersWhereDTO = keyof CountOrdersWhereDTO;

export type CountOrdersDTO = IBaseCountDTO<CountOrdersWhereDTO>;
