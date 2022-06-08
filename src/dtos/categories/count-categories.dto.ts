import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCategoriesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCategoriesWhereDTO = keyof CountCategoriesWhereDTO;

export type CountCategoriesDTO = IBaseCountDTO<CountCategoriesWhereDTO>;
