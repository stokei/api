import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export interface CountOrderItemsWhereDTO {
  ids?: string[];
  name?: IWhereDataSearch;
  order?: IWhereData;
  product?: IWhereData;
  description?: IWhereDataSearch;
  type?: IWhereData<PriceType>;
  recurringIntervalCount?: IWhereData<number>;
  recurringIntervalType?: IWhereData<RecurringType>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountOrderItemsWhereDTO = keyof CountOrderItemsWhereDTO;

export type CountOrderItemsDTO = IBaseCountDTO<CountOrderItemsWhereDTO>;
