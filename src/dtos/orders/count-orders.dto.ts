import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { OrderStatus } from '@/enums/order-status.enum';

export interface CountOrdersWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  currency?: IWhereData;
  status?: OrderStatus;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountOrdersWhereDTO = keyof CountOrdersWhereDTO;

export type CountOrdersDTO = IBaseCountDTO<CountOrdersWhereDTO>;
