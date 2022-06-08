import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountProductsCategoriesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountProductsCategoriesWhereDTO =
  keyof CountProductsCategoriesWhereDTO;

export type CountProductsCategoriesDTO =
  IBaseCountDTO<CountProductsCategoriesWhereDTO>;
