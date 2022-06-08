import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountProductsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountProductsWhereDTO = keyof CountProductsWhereDTO;

export type CountProductsDTO = IBaseCountDTO<CountProductsWhereDTO>;
