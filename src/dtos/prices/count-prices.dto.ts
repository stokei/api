import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountPricesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountPricesWhereDTO = keyof CountPricesWhereDTO;

export type CountPricesDTO = IBaseCountDTO<CountPricesWhereDTO>;
