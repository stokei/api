import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountProductsTagsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountProductsTagsWhereDTO = keyof CountProductsTagsWhereDTO;

export type CountProductsTagsDTO = IBaseCountDTO<CountProductsTagsWhereDTO>;
