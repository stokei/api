import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountPriceTiersWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  amount?: IWhereData<number>;
  upTo?: IWhereData<number>;
  infinite?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPriceTiersWhereDTO = keyof CountPriceTiersWhereDTO;

export type CountPriceTiersDTO = IBaseCountDTO<CountPriceTiersWhereDTO>;
