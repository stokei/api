import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { IntervalType } from '@/enums/interval-type.enum';
import { UsageType } from '@/enums/usage-type.enum';

export interface CountRecurringsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  usageType?: UsageType;
  intervalCount?: IWhereData<number>;
  interval?: IntervalType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountRecurringsWhereDTO = keyof CountRecurringsWhereDTO;

export type CountRecurringsDTO = IBaseCountDTO<CountRecurringsWhereDTO>;
