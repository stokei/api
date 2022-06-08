import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountProductsImagesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountProductsImagesWhereDTO =
  keyof CountProductsImagesWhereDTO;

export type CountProductsImagesDTO = IBaseCountDTO<CountProductsImagesWhereDTO>;
