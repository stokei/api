import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountOrdersSellersWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountOrdersSellersWhereDTO = keyof CountOrdersSellersWhereDTO;

export type CountOrdersSellersDTO = IBaseCountDTO<CountOrdersSellersWhereDTO>;
