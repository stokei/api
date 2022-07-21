import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountSubscriptionsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountSubscriptionsWhereDTO = keyof CountSubscriptionsWhereDTO;

export type CountSubscriptionsDTO = IBaseCountDTO<CountSubscriptionsWhereDTO>;
