import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCardsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCardsWhereDTO = keyof CountCardsWhereDTO;

export type CountCardsDTO = IBaseCountDTO<CountCardsWhereDTO>;
