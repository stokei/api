import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

import { IntervalType } from '@/enums/interval-type.enum';
import { UsageType } from '@/enums/usage-type.enum';

export interface WhereDataFindAllRecurringsDTO {
  ids?: string[];
  app?: IWhereData;
  usageType?: UsageType;
  intervalCount?: IWhereData<number>;
  interval?: IntervalType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllRecurringsDTO =
  keyof WhereDataFindAllRecurringsDTO;

export interface OrderByDataFindAllRecurringsDTO {
  usageType?: IOrderBy;
  intervalCount?: IOrderBy;
  interval?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllRecurringsDTO =
  keyof OrderByDataFindAllRecurringsDTO;

export type FindAllRecurringsDTO = IBaseFindManyDTO<
  WhereDataFindAllRecurringsDTO,
  OrderByDataFindAllRecurringsDTO
>;
