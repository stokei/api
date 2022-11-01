import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { PlanType } from '@/enums/plan-type.enum';

export interface CountPlansWhereDTO {
  ids?: string[];
  app?: IWhereData;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  type?: PlanType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPlansWhereDTO = keyof CountPlansWhereDTO;

export type CountPlansDTO = IBaseCountDTO<CountPlansWhereDTO>;
