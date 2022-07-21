import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountImagesWhereDTO {
  ids?: string[];
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountImagesWhereDTO = keyof CountImagesWhereDTO;

export type CountImagesDTO = IBaseCountDTO<CountImagesWhereDTO>;
