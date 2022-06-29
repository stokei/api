import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountImagesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountImagesWhereDTO = keyof CountImagesWhereDTO;

export type CountImagesDTO = IBaseCountDTO<CountImagesWhereDTO>;
