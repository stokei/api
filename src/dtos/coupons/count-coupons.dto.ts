import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCouponsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  recipient?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountCouponsWhereDTO = keyof CountCouponsWhereDTO;

export type CountCouponsDTO = IBaseCountDTO<CountCouponsWhereDTO>;
